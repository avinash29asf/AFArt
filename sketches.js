/* ============================================================
   A F Art - Online Sketch Store
   Daily Sketch Data
   ------------------------------------------------------------
   HOW TO ADD A NEW SKETCH EACH DAY:
   1. Copy your sketch image into this SAME root folder
      (e.g. realistic-pencil-eye-sketch.jpg)
   2. Add one new object to the sketches array below
   3. Run  powershell -File _gen-sketch-pages.ps1
      to generate the static sketch-N.html share page
      (THIS page carries the correct photo for WhatsApp /
      Facebook previews - without it, shared links show the
      wrong photo)
   4. Commit & push to GitHub

   The new sketch automatically appears on Home, Gallery,
   Shop and Sketch Details pages. No HTML edits needed.
   ============================================================ */

const sketches = [
    {
        id: 1,
        title: "Realistic Eye Sketch",
        description: "A5 size hand-drawn hyper-detailed pencil study of a single eye - rich tonal depth, crisp highlights and lifelike shading on premium paper. Unframed original, ideal for gifting and home decor.",
        image: "realistic-pencil-eye-sketch.jpg",
        price: 1299,
        size: "A5",
        category: "Portrait",
        date: "2026-09-09",
        type: "Original",
        available: true,
        featured: true
    },
    {
        id: 2,
        title: "Chhatrapati Shivaji Maharaj Sketch",
        description: "A5 size detailed pencil portrait of Chhatrapati Shivaji Maharaj - the great warrior king captured with strength, dignity and fine graphite shading. Unframed original on premium paper.",
        image: "chhatrapati-shivaji-maharaj-pencil-sketch.jpg",
        price: 1699,
        size: "A5",
        category: "Portrait",
        date: "2026-09-09",
        type: "Original",
        available: true,
        featured: true
    },
    {
        id: 3,
        title: "Iron Man Sketch",
        description: "A5 size striking pencil sketch of Iron Man in crisp graphite - bold armour detail, clean line work and heroic finish. Unframed original, perfect for Marvel fans and room decor.",
        image: "iron-man-pencil-sketch.jpg",
        price: 1499,
        size: "A5",
        category: "Portrait",
        date: "2026-09-09",
        type: "Original",
        available: true,
        featured: true
    },
    {
        id: 4,
        title: "Captain Jack Sparrow Sketch",
        description: "A5 size warm-toned charcoal portrait of Captain Jack Sparrow - deep shadows, expressive eyes and iconic pirate character detailing. Unframed original on premium paper.",
        image: "captain-jack-sparrow-charcoal-sketch.jpg",
        price: 1499,
        size: "A5",
        category: "Portrait",
        date: "2026-09-09",
        type: "Original",
        available: true,
        featured: false
    },
    {
        id: 5,
        title: "Ganpati Sketch",
        description: "A5 size beautifully hand-drawn Lord Ganesha (Ganpati) sketch in warm graphite and charcoal tones - spiritual, detailed and one-of-a-kind. Unframed original, ideal for pooja room and gifting.",
        image: "ganpati-pencil-sketch.jpg",
        price: 1399,
        size: "A5",
        category: "Portrait",
        date: "2026-09-09",
        type: "Original",
        available: true,
        featured: true
    },
    {
        id: 6,
        title: "Shri Krishna Sketch",
        description: "A5 size divine hand-drawn pencil portrait of Shri Krishna - serene expression, delicate shading and devotional detailing on premium paper. Unframed original, perfect for home temple and gifting.",
        image: "shri-krishna-pencil-sketch.jpg",
        price: 1499,
        size: "A5",
        category: "Portrait",
        date: "2026-09-09",
        type: "Original",
        available: true,
        featured: true
    },
    {
        id: 7,
        title: "Dr. Sarvepalli Radhakrishnan Sketch - Teachers Day Special",
        description: "A5 size tribute hand-drawn pencil portrait of Dr. Sarvepalli Radhakrishnan - India's great philosopher, teacher and former President, in whose honour Teachers Day is celebrated on 5th September. Fine graphite shading on premium paper. Unframed original, perfect Teachers Day gift for teachers and school decor.",
        image: "dr-sarvepalli-radhakrishnan-pencil-sketch.jpg",
        price: 1499,
        size: "A5",
        category: "Portrait",
        date: "2026-09-05",
        type: "Original",
        available: true,
        featured: true
    },
    {
        id: 8,
        title: "Spiderman Sketch",
        description: "A5 size dynamic pencil sketch of Spiderman - bold web-suit detailing, action pose and crisp comic-style shading. Unframed original, best for kids room decor and Marvel lovers.",
        image: "spiderman-pencil-sketch.jpg",
        price: 1499,
        size: "A5",
        category: "Portrait",
        date: "2026-09-09",
        type: "Original",
        available: true,
        featured: true
    },
    {
        id: 9,
        title: "Deadpool & Wolverine Sketch",
        description: "A5 size hand-drawn pencil sketch of Marvel's most iconic duo - Deadpool and Wolverine. Bold graphite detailing, expressive faces and sharp comic-style shading bring both characters to life on premium paper. Unframed original, perfect for Marvel fans and room decor.",
        image: "deadpool-and-wolverine-pencil-sketch.jpg",
        price: 1499,
        size: "A5",
        category: "Portrait",
        date: "2026-09-13",
        type: "Original",
        available: true,
        featured: true
    },
    {
        id: 10,
        title: "Mother and Daughter Sketch",
        description: "A5 size heart-warming hand-drawn pencil sketch of a mother and daughter - soft graphite shading, gentle expressions and fine detailing beautifully capture the special bond between them on premium paper. Unframed original, perfect for gifting to your mother or as a treasured family keepsake.",
        image: "mother and daughter.jpeg",
        price: 1499,
        size: "A5",
        category: "Family",
        date: "2026-09-14",
        type: "Original",
        available: true,
        featured: true
    },
    {
        id: 11,
        title: "Ma Durga Sketch",
        description: "A5 size divine hand-drawn pencil sketch of Maa Durga - the goddess of power and protection, captured with serene strength, intricate detailing and fine graphite shading on premium paper. Unframed original, perfect for pooja room, gifting and festive decor.",
        image: "Ma Durga.jpg",
        price: 1499,
        size: "A5",
        category: "Portrait",
        date: "2026-09-17",
        type: "Original",
        available: true,
        featured: true
    },
    {
        id: 12,
        title: "Sir Mokshagundam Visvesvaraya Sketch - Engineers Day Special",
        description: "A5 size tribute hand-drawn pencil portrait of Sir Mokshagundam Visvesvaraya - India's legendary civil engineer and Bharat Ratna awardee, in whose honour Engineers Day is celebrated on 15th September. Fine graphite shading on premium paper. Unframed original, perfect for engineers, teachers and office decor.",
        image: "Sir Mokshagundam Visvesvaraya.jpeg",
        price: 1499,
        size: "A5",
        category: "Portrait",
        date: "2026-09-15",
        type: "Original",
        available: true,
        featured: true
    }
];
