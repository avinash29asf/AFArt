/* ============================================================
   A F Art - Online Sketch Store
   Daily Sketch Data
   ------------------------------------------------------------
   HOW TO ADD A NEW SKETCH EACH DAY:
   1. Copy your sketch image into this SAME root folder
      (e.g. sketch-004.jpg)
   2. Add one new object to the sketches array below
   3. Commit & push to GitHub

   The new sketch automatically appears on Home, Gallery,
   Shop and Sketch Details pages. No HTML edits needed.
   ============================================================ */

const sketches = [
    {
        id: 1,
        title: "Portrait Sketch",
        description: "Hand-drawn pencil portrait of a single person, detailed shading and fine line work on premium paper.",
        image: "sketch-001.jpg",
        price: 999,
        size: "A4",
        category: "Portrait",
        date: "2026-08-25",
        type: "Original",
        available: true,
        featured: true
    },
    {
        id: 2,
        title: "Couple Sketch",
        description: "Romantic couple pencil sketch capturing your special moments together with soft, realistic shading.",
        image: "sketch-002.jpg",
        price: 1499,
        size: "A4",
        category: "Couple",
        date: "2026-08-24",
        type: "Original",
        available: true,
        featured: true
    },
    {
        id: 3,
        title: "Family Sketch",
        description: "Beautiful family portrait sketch, perfect for gifting. Every member drawn with care and detail.",
        image: "sketch-003.jpg",
        price: 1999,
        size: "A3",
        category: "Family",
        date: "2026-08-23",
        type: "Original",
        available: true,
        featured: true
    },
    {
        id: 4,
        title: "Pet Sketch",
        description: "Adorable pencil sketch of your beloved pet. Captures personality with expressive, lifelike eyes.",
        image: "sketch-004.jpg",
        price: 899,
        size: "A5",
        category: "Pet",
        date: "2026-08-22",
        type: "Original",
        available: true,
        featured: false
    },
    {
        id: 5,
        title: "Pencil Portrait Print",
        description: "High-quality print of a finished pencil portrait, ready to frame. Great for keepsakes and gifting.",
        image: "sketch-005.jpg",
        price: 499,
        size: "A4",
        category: "Print",
        date: "2026-08-21",
        type: "Print",
        available: true,
        featured: true
    },
    {
        id: 6,
        title: "Custom Artwork Sketch",
        description: "Original custom artwork drawn to your exact idea and reference. A one-of-a-kind hand-drawn piece.",
        image: "sketch-006.jpg",
        price: 2499,
        size: "A3",
        category: "Custom",
        date: "2026-08-20",
        type: "Original",
        available: false,
        featured: false
    },
    {
        id: 7,
        title: "Digital Sketch Portrait",
        description: "Hand-finished digital portrait sketch delivered as a high-resolution file for instant sharing.",
        image: "sketch-007.jpg",
        price: 749,
        size: "Digital",
        category: "Portrait",
        date: "2026-08-19",
        type: "Digital",
        available: true,
        featured: false
    },
    {
        id: 8,
        title: "Kids Portrait Sketch",
        description: "Gentle, sweet pencil sketch of a child. A wonderful memory keepsake for parents and grandparents.",
        image: "sketch-008.jpg",
        price: 949,
        size: "A4",
        category: "Portrait",
        date: "2026-08-18",
        type: "Original",
        available: true,
        featured: false
    }
];
