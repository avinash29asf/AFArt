/* ============================================================
   A F Art - Online Sketch Store
   Daily Sketch Data
   ------------------------------------------------------------
   HOW TO ADD A NEW SKETCH EACH DAY:
   1. Copy your sketch image into this SAME root folder
      (e.g. realistic-pencil-eye-sketch.jpg)
   2. Add one new object to the sketches array below
   3. Commit & push to GitHub

   The new sketch automatically appears on Home, Gallery,
   Shop and Sketch Details pages. No HTML edits needed.
   ============================================================ */

const sketches = [
    {
        id: 1,
        title: "Realistic Eye Sketch",
        description: "A finely detailed hand-drawn pencil study of a single eye - rich tonal depth, crisp highlights and lifelike detail on premium paper.",
        image: "realistic-pencil-eye-sketch.jpg",
        price: 1099,
        size: "A4",
        category: "Portrait",
        date: "2026-08-28",
        type: "Original",
        available: true,
        featured: true
    },
    {
        id: 2,
        title: "Chhatrapati Shivaji Maharaj Sketch",
        description: "Detailed pencil portrait of Chhatrapati Shivaji Maharaj, capturing the great warrior king with strength, dignity and fine graphite shading.",
        image: "chhatrapati-shivaji-maharaj-pencil-sketch.jpg",
        price: 2499,
        size: "A4",
        category: "Portrait",
        date: "2026-08-25",
        type: "Original",
        available: true,
        featured: true
    },
    {
        id: 3,
        title: "Iron Man Sketch",
        description: "Striking pencil sketch of Iron Man in crisp graphite on white paper - bold armour detail, clean line work and a heroic finish.",
        image: "iron-man-pencil-sketch.jpg",
        price: 1999,
        size: "A3",
        category: "Portrait",
        date: "2026-08-25",
        type: "Original",
        available: true,
        featured: true
    },
    {
        id: 4,
        title: "Captain Jack Sparrow Sketch",
        description: "Warm-toned charcoal portrait of Captain Jack Sparrow with deep shadows and expressive detail, capturing the iconic pirate's character.",
        image: "captain-jack-sparrow-charcoal-sketch.jpg",
        price: 1899,
        size: "A4",
        category: "Portrait",
        date: "2026-08-25",
        type: "Original",
        available: true,
        featured: false
    },
    {
        id: 5,
        title: "Ganpati Sketch",
        description: "Beautifully hand-drawn Lord Ganesha (Ganpati) sketch in warm graphite and charcoal tones - a spiritual, detailed and one-of-a-kind piece.",
        image: "ganpati-pencil-sketch.jpg",
        price: 1599,
        size: "A5",
        category: "Portrait",
        date: "2026-08-25",
        type: "Original",
        available: true,
        featured: true
    }
];
