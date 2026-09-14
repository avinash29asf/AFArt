# Generates static sketch-{id}.html share pages from sketches.js
# Each page bakes the CORRECT photo into og:image / twitter:image so
# WhatsApp / Facebook / Telegram previews show THAT sketch's photo.
# Usage:  powershell -File _gen-sketch-pages.ps1
$ErrorActionPreference = 'Stop'
$root      = Split-Path -Parent $MyInvocation.MyCommand.Path
$jsPath    = Join-Path $root 'sketches.js'
$tplPath   = Join-Path $root '_sketch-page-template.html'
$site      = 'https://avinash29asf.github.io/AFArt'
$rsym      = [string][char]0x20B9   # rupee sign

function Esc-Html([string]$s) {
    return (($s.Replace('&', '&amp;')).Replace('<', '&lt;')).Replace('>', '&gt;')
}
function InrPrice([int]$n) {
    $s = $n.ToString()
    if ($s.Length -gt 3) { $s = $s.Substring(0, $s.Length - 3) + ',' + $s.Substring($s.Length - 3) }
    return $rsym + $s
}

$js  = Get-Content $jsPath -Raw
$m   = [regex]::Match($js, '(?s)const sketches\s*=\s*\[(.*?)\n\s*\];')
if (-not $m.Success) { throw 'Could not find sketches array in sketches.js' }
$chunks = [regex]::Split($m.Groups[1].Value, '\}\s*,\s*\n\s*\{')
$tpl    = Get-Content $tplPath -Raw
$count  = 0

foreach ($chunk in $chunks) {
    if ($chunk -notmatch '(?m)id:\s*(\d+)') { continue }
    $id     = $matches[1]
    $title  = [regex]::Match($chunk, '(?m)title:\s*"([^"]*)"').Groups[1].Value
    $desc   = [regex]::Match($chunk, '(?m)description:\s*"([^"]*)"').Groups[1].Value
    $image  = [regex]::Match($chunk, '(?m)image:\s*"([^"]*)"').Groups[1].Value
    $price  = [int][regex]::Match($chunk, '(?m)price:\s*(\d+)').Groups[1].Value
    $size   = [regex]::Match($chunk, '(?m)size:\s*"([^"]*)"').Groups[1].Value
    $cat    = [regex]::Match($chunk, '(?m)category:\s*"([^"]*)"').Groups[1].Value
    $type   = [regex]::Match($chunk, '(?m)type:\s*"([^"]*)"').Groups[1].Value

    $pageUrl  = $site + '/sketch-' + $id + '.html'
    $imgUrl   = $site + '/' + [System.Uri]::EscapeDataString($image)
    $priceTxt = InrPrice $price
    $shareTxt = 'Check out this beautiful ' + $title + ' hand-drawn sketch by A F Art! ' + $pageUrl
    $buyTxt   = 'I want to buy this ' + $title + ' (' + $priceTxt + ') from A F Art. Please confirm availability and delivery details.'
    $titleSafe = ($title -replace '[^\w.-]+', '_')
    $shareTxtJs = $shareTxt.Replace("'", "\'")

    $h = $tpl
    $h = $h.Replace('{ID}', $id)
    $h = $h.Replace('{TITLE}', (Esc-Html $title))
    $h = $h.Replace('{TITLE_JSON}', $title)
    $h = $h.Replace('{TITLE_SAFE}', $titleSafe)
    $h = $h.Replace('{DESC}', (Esc-Html $desc))
    $h = $h.Replace('{DESC_JSON}', $desc)
    $h = $h.Replace('{IMAGE}', $image)
    $h = $h.Replace('{IMG_URL}', $imgUrl)
    $h = $h.Replace('{PAGE_URL}', $pageUrl)
    $h = $h.Replace('{PHOTO_URL}', $imgUrl)
    $h = $h.Replace('{SHARE_TEXT}', $shareTxtJs)
    $h = $h.Replace('{SIZE}', $size)
    $h = $h.Replace('{CATEGORY}', $cat)
    $h = $h.Replace('{TYPE}', $type)
    $h = $h.Replace('{PRICE}', $priceTxt)
    $h = $h.Replace('{PRICE_NUM}', $price.ToString())
    $h = $h.Replace('{WA_BUY}', [System.Uri]::EscapeDataString($buyTxt))
    $h = $h.Replace('{WA_SHARE}', [System.Uri]::EscapeDataString($shareTxt))
    $h = $h.Replace('{FB_URL}', [System.Uri]::EscapeDataString($pageUrl))
    $h = $h.Replace('{X_URL}', [System.Uri]::EscapeDataString($pageUrl))
    $h = $h.Replace('{X_TEXT}', [System.Uri]::EscapeDataString($shareTxt))
    $h = $h.Replace('{PIN_URL}', [System.Uri]::EscapeDataString($pageUrl))
    $h = $h.Replace('{PIN_MEDIA}', [System.Uri]::EscapeDataString($imgUrl))
    $h = $h.Replace('{PIN_TEXT}', [System.Uri]::EscapeDataString($shareTxt))

    if ($h -match '\{[A-Z_]+\}') { throw ('Unreplaced placeholder in sketch-' + $id + ': ' + $matches[0]) }
    $out = Join-Path $root ('sketch-' + $id + '.html')
    Set-Content -Path $out -Value $h -Encoding UTF8
    $count++
    Write-Output ('generated ' + $out)
}
Write-Output ('TOTAL: ' + $count + ' sketch share pages')