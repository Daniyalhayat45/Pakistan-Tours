import { PrismaClient, Role, InquiryType, InquiryStatus } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // --- Admin user ---
  // Hardcoded admin login — change this password from Admin → Users after your first login.
  const adminEmail = "admin@paktourismgateway.com";
  const adminPassword = "ChangeMe123!";
  const passwordHash = await bcrypt.hash(adminPassword, 10);

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      name: "Super Admin",
      email: adminEmail,
      passwordHash,
      role: Role.SUPER_ADMIN,
    },
  });

  // --- Site settings ---
  await prisma.siteSettings.upsert({
    where: { id: "singleton" },
    update: {},
    create: {
      id: "singleton",
      siteName: "Pakistan Tourism Gateway",
      contactEmail: "info@paktourismgateway.com",
      contactPhone: "+92 300 0000000",
      whatsapp: "https://chat.whatsapp.com/EbWA02Mp8rKKecJr1rZ6Jl",
      instagramUrl: "https://www.instagram.com/paktourismgateway/",
      tiktokUrl: "https://www.tiktok.com/@paktourismgateway",
      youtubeUrl: "https://youtube.com/@pakistantourismgateway4368",
      metaTitle: "Pakistan Tourism Gateway | Gateway to Adventure and Culture",
      metaDesc: "Premium curated tours across Pakistan — mountains, valleys, culture and hospitality since 2019.",
    },
  });

  // --- Skip re-seeding sample content if this DB already has data ---
  // (the admin user / settings above are always safe to re-run via upsert)
  const alreadySeeded = (await prisma.destination.count()) > 0;
  if (alreadySeeded) {
    console.log("Sample content already exists — skipping content seed (admin user/settings still synced).");
    return;
  }

  // --- Destinations ---
  const destinationsData = [
    {
      slug: "hunza-valley",
      name: "Hunza Valley",
      region: "Gilgit-Baltistan",
      summary: "Snow-capped peaks, terraced orchards and centuries-old forts.",
      description:
        "Hunza Valley is one of Pakistan's most iconic destinations, framed by Rakaposhi and Ultar Sar. Visit Baltit and Altit Forts, walk through apricot orchards, and take in views over Attabad Lake.",
      coverImage: "https://picsum.photos/seed/604ce9b84c/1200/780",
      images: [
        "https://picsum.photos/seed/604ce9b84c/1200/780",
        "https://picsum.photos/seed/a716066fba/1200/780",
      ],
      bestSeason: "April - October",
      featured: true,
    },
    {
      slug: "skardu",
      name: "Skardu",
      region: "Gilgit-Baltistan",
      summary: "Gateway to K2 and the Karakoram giants.",
      description:
        "Skardu is the base for trekking toward the world's highest peaks, home to Shangrila Resort, Upper Kachura Lake and the vast Deosai Plains nearby.",
      coverImage: "https://picsum.photos/seed/e1d2639e2c/1200/780",
      images: ["https://picsum.photos/seed/e1d2639e2c/1200/780"],
      bestSeason: "May - September",
      featured: true,
    },
    {
      slug: "swat-valley",
      name: "Swat Valley",
      region: "Khyber Pakhtunkhwa",
      summary: "The Switzerland of Pakistan — rivers, meadows and pine forests.",
      description:
        "Swat Valley offers lush green landscapes, the Malam Jabba ski resort, and historic Buddhist ruins scattered through the region.",
      coverImage: "https://picsum.photos/seed/6f56f65bb6/1200/780",
      images: ["https://picsum.photos/seed/6f56f65bb6/1200/780"],
      bestSeason: "March - November",
      featured: true,
    },
    {
      slug: "naran-kaghan",
      name: "Naran Kaghan",
      region: "Khyber Pakhtunkhwa",
      summary: "Alpine lakes and waterfalls including Saif-ul-Malook.",
      description:
        "Naran Kaghan valley is famous for Lake Saif-ul-Malook, Lulusar Lake and the road to Babusar Top connecting to Gilgit-Baltistan.",
      coverImage: "https://picsum.photos/seed/1b4ad5b2d3/1200/780",
      images: ["https://picsum.photos/seed/1b4ad5b2d3/1200/780"],
      bestSeason: "May - September",
      featured: false,
    },
    {
      slug: "lahore",
      name: "Lahore",
      region: "Punjab",
      summary: "Cultural capital — Mughal architecture and vibrant food streets.",
      description:
        "Lahore is home to the Badshahi Mosque, Lahore Fort, Shalimar Gardens, and the legendary food streets of the Walled City.",
      coverImage: "https://picsum.photos/seed/e8521c0985/1200/780",
      images: ["https://picsum.photos/seed/e8521c0985/1200/780"],
      bestSeason: "October - March",
      featured: false,
    },
    {
      slug: "hunza-fairy-meadows",
      name: "Fairy Meadows",
      region: "Gilgit-Baltistan",
      summary: "Base camp views of Nanga Parbat, the 'Killer Mountain'.",
      description:
        "Fairy Meadows offers some of the most dramatic direct views of Nanga Parbat, reached by jeep and a short trek through pine forest.",
      coverImage: "https://picsum.photos/seed/59cd8d9be8/1200/780",
      images: ["https://picsum.photos/seed/59cd8d9be8/1200/780"],
      bestSeason: "June - September",
      featured: true,
    },
  ];

  const destinations: Record<string, string> = {};
  for (const d of destinationsData) {
    const created = await prisma.destination.upsert({
      where: { slug: d.slug },
      update: {},
      create: d,
    });
    destinations[d.slug] = created.id;
  }

  // --- Hotels ---
  const hotelsData = [
    {
      slug: "serena-hunza",
      name: "Serena Hunza",
      city: "Hunza",
      stars: 5,
      description: "Luxury mountain resort with panoramic valley views.",
      amenities: ["Free WiFi", "Restaurant", "Mountain View", "Room Service"],
      coverImage: "https://picsum.photos/seed/11eed97122/1200/780",
      images: ["https://picsum.photos/seed/11eed97122/1200/780"],
      priceFrom: 25000,
      featured: true,
    },
    {
      slug: "shangrila-skardu",
      name: "Shangrila Resort",
      city: "Skardu",
      stars: 4,
      description: "Iconic resort beside the turquoise Lower Kachura Lake.",
      amenities: ["Lake View", "Restaurant", "Parking", "Garden"],
      coverImage: "https://picsum.photos/seed/63d5ca27d8/1200/780",
      images: ["https://picsum.photos/seed/63d5ca27d8/1200/780"],
      priceFrom: 18000,
      featured: true,
    },
    {
      slug: "swat-serena",
      name: "Swat Serena Hotel",
      city: "Swat",
      stars: 5,
      description: "Riverside luxury stay in the heart of Swat Valley.",
      amenities: ["Free WiFi", "Spa", "River View", "Restaurant"],
      coverImage: "https://picsum.photos/seed/df43376781/1200/780",
      images: ["https://picsum.photos/seed/df43376781/1200/780"],
      priceFrom: 20000,
      featured: false,
    },
  ];
  const hotels: Record<string, string> = {};
  for (const h of hotelsData) {
    const created = await prisma.hotel.upsert({ where: { slug: h.slug }, update: {}, create: h });
    hotels[h.slug] = created.id;
  }

  // --- Vehicles ---
  const vehiclesData = [
    {
      slug: "toyota-hiace-grand",
      name: "Toyota Hiace Grand Cabin",
      type: "Van",
      capacity: 12,
      description: "Comfortable AC van ideal for group mountain tours.",
      features: ["AC", "Reclining Seats", "Luggage Space"],
      coverImage: "https://picsum.photos/seed/c0b7850711/1200/780",
      images: ["https://picsum.photos/seed/c0b7850711/1200/780"],
      priceFrom: 8000,
    },
    {
      slug: "toyota-land-cruiser",
      name: "Toyota Land Cruiser 4x4",
      type: "SUV",
      capacity: 6,
      description: "Rugged 4x4 for jeep tracks like Fairy Meadows and Deosai.",
      features: ["4x4", "AC", "Off-road Tyres"],
      coverImage: "https://picsum.photos/seed/c5eef061b2/1200/780",
      images: ["https://picsum.photos/seed/c5eef061b2/1200/780"],
      priceFrom: 12000,
    },
    {
      slug: "honda-civic",
      name: "Honda Civic",
      type: "Sedan",
      capacity: 4,
      description: "Comfortable sedan for city tours and airport transfers.",
      features: ["AC", "Leather Seats"],
      coverImage: "https://picsum.photos/seed/3ed4a54664/1200/780",
      images: ["https://picsum.photos/seed/3ed4a54664/1200/780"],
      priceFrom: 6000,
    },
  ];
  const vehicles: Record<string, string> = {};
  for (const v of vehiclesData) {
    const created = await prisma.vehicle.upsert({ where: { slug: v.slug }, update: {}, create: v });
    vehicles[v.slug] = created.id;
  }

  // --- Tours ---
  const toursData = [
    {
      slug: "hunza-valley-5-days",
      title: "Hunza Valley 5 Days Tour",
      destinationSlug: "hunza-valley",
      summary: "Explore Baltit Fort, Attabad Lake and Khunjerab Pass.",
      durationDays: 5,
      durationNights: 4,
      priceFrom: 65000,
      groupSizeMax: 15,
      difficulty: "Easy",
      itinerary: [
        { day: 1, title: "Islamabad to Naran", details: "Drive along the Karakoram Highway." },
        { day: 2, title: "Naran to Hunza", details: "Cross Babusar Top, arrive in Hunza by evening." },
        { day: 3, title: "Hunza Sightseeing", details: "Baltit Fort, Altit Fort, Eagle's Nest." },
        { day: 4, title: "Attabad Lake & Khunjerab", details: "Day trip to Khunjerab Pass (weather permitting)." },
        { day: 5, title: "Return Journey", details: "Drive back toward Islamabad." },
      ],
      inclusions: ["Transport", "Hotel stay", "Breakfast & Dinner", "Tour guide"],
      exclusions: ["Airfare", "Lunch", "Personal expenses"],
      meals: ["Breakfast", "Dinner"],
      weatherInfo: "Cool in evenings even in summer; pack layers.",
      packingList: ["Warm jacket", "Comfortable shoes", "Sunglasses", "Camera"],
      coverImage: "https://picsum.photos/seed/604ce9b84c/1200/780",
      images: ["https://picsum.photos/seed/604ce9b84c/1200/780"],
      featured: true,
      hotelSlug: "serena-hunza",
      vehicleSlug: "toyota-hiace-grand",
    },
    {
      slug: "skardu-adventure-6-days",
      title: "Skardu Adventure 6 Days",
      destinationSlug: "skardu",
      summary: "Deosai Plains, Shangrila Resort and Upper Kachura Lake.",
      durationDays: 6,
      durationNights: 5,
      priceFrom: 78000,
      groupSizeMax: 12,
      difficulty: "Moderate",
      itinerary: [
        { day: 1, title: "Islamabad to Skardu (flight/road)", details: "Arrival and check-in." },
        { day: 2, title: "Shangrila & Kachura Lake", details: "Visit the 'Heaven on Earth' resort." },
        { day: 3, title: "Deosai Plains", details: "Full-day excursion to the Land of Giants." },
        { day: 4, title: "Shigar Valley", details: "Explore Shigar Fort and cold desert." },
        { day: 5, title: "Free day / optional trekking", details: "Optional short trek." },
        { day: 6, title: "Departure", details: "Return flight/road to Islamabad." },
      ],
      inclusions: ["Transport", "Hotel stay", "Breakfast & Dinner", "Tour guide", "Permits"],
      exclusions: ["Airfare", "Lunch", "Personal expenses"],
      meals: ["Breakfast", "Dinner"],
      weatherInfo: "Deosai can be cold and windy; carry warm layers year-round.",
      packingList: ["Warm jacket", "Trekking shoes", "Sunblock", "Power bank"],
      coverImage: "https://picsum.photos/seed/e1d2639e2c/1200/780",
      images: ["https://picsum.photos/seed/e1d2639e2c/1200/780"],
      featured: true,
      hotelSlug: "shangrila-skardu",
      vehicleSlug: "toyota-land-cruiser",
    },
    {
      slug: "swat-valley-4-days",
      title: "Swat Valley 4 Days Family Tour",
      destinationSlug: "swat-valley",
      summary: "Malam Jabba, Mingora bazaar and Kalam valley.",
      durationDays: 4,
      durationNights: 3,
      priceFrom: 45000,
      groupSizeMax: 20,
      difficulty: "Easy",
      itinerary: [
        { day: 1, title: "Islamabad to Swat", details: "Drive to Mingora, check-in." },
        { day: 2, title: "Malam Jabba", details: "Chairlift and mountain views." },
        { day: 3, title: "Kalam Valley", details: "Visit Kalam and Ushu Forest." },
        { day: 4, title: "Return Journey", details: "Drive back to Islamabad." },
      ],
      inclusions: ["Transport", "Hotel stay", "Breakfast & Dinner", "Tour guide"],
      exclusions: ["Airfare", "Lunch", "Personal expenses"],
      meals: ["Breakfast", "Dinner"],
      weatherInfo: "Pleasant summers, snowy winters at higher elevations.",
      packingList: ["Light jacket", "Walking shoes", "Camera"],
      coverImage: "https://picsum.photos/seed/6f56f65bb6/1200/780",
      images: ["https://picsum.photos/seed/6f56f65bb6/1200/780"],
      featured: true,
      hotelSlug: "swat-serena",
      vehicleSlug: "toyota-hiace-grand",
    },
    {
      slug: "fairy-meadows-3-days",
      title: "Fairy Meadows 3 Days Trek",
      destinationSlug: "hunza-fairy-meadows",
      summary: "Jeep track and short trek to Nanga Parbat base views.",
      durationDays: 3,
      durationNights: 2,
      priceFrom: 38000,
      groupSizeMax: 10,
      difficulty: "Moderate",
      itinerary: [
        { day: 1, title: "Raikot Bridge to Fairy Meadows", details: "Jeep ride and short trek." },
        { day: 2, title: "Nanga Parbat Base Camp Views", details: "Optional trek to Beyal Camp." },
        { day: 3, title: "Return", details: "Trek and jeep back to Raikot Bridge." },
      ],
      inclusions: ["Jeep transport", "Camping/cottage stay", "Meals", "Guide"],
      exclusions: ["Airfare", "Personal gear", "Personal expenses"],
      meals: ["Breakfast", "Lunch", "Dinner"],
      weatherInfo: "Cold nights even in summer; camping gear essential.",
      packingList: ["Sleeping bag", "Trekking shoes", "Warm jacket", "Headlamp"],
      coverImage: "https://picsum.photos/seed/59cd8d9be8/1200/780",
      images: ["https://picsum.photos/seed/59cd8d9be8/1200/780"],
      featured: false,
      hotelSlug: "serena-hunza",
      vehicleSlug: "toyota-land-cruiser",
    },
  ];

  for (const t of toursData) {
    const { destinationSlug, hotelSlug, vehicleSlug, ...rest } = t;
    const tour = await prisma.tour.upsert({
      where: { slug: t.slug },
      update: {},
      create: {
        ...rest,
        destinationId: destinations[destinationSlug],
      },
    });
    await prisma.tourHotel.upsert({
      where: { tourId_hotelId: { tourId: tour.id, hotelId: hotels[hotelSlug] } },
      update: {},
      create: { tourId: tour.id, hotelId: hotels[hotelSlug], nights: t.durationNights },
    });
    await prisma.tourVehicle.upsert({
      where: { tourId_vehicleId: { tourId: tour.id, vehicleId: vehicles[vehicleSlug] } },
      update: {},
      create: { tourId: tour.id, vehicleId: vehicles[vehicleSlug] },
    });
  }

  // --- Blogs ---
  const blogsData = [
    {
      slug: "best-time-visit-hunza",
      title: "Best Time to Visit Hunza Valley",
      excerpt: "Everything you need to know about Hunza's seasons.",
      content: "Hunza Valley transforms across the seasons — cherry blossoms in spring, lush greenery in summer, and golden autumn colors from late September through October. This guide covers the best months to plan your trip.",
      coverImage: "https://picsum.photos/seed/604ce9b84c/1200/780",
      tags: ["Hunza", "Travel Tips"],
    },
    {
      slug: "packing-guide-northern-pakistan",
      title: "Packing Guide for Northern Pakistan",
      excerpt: "A practical checklist for mountain trips.",
      content: "From layered clothing to altitude essentials, here is a practical packing checklist for anyone heading into Gilgit-Baltistan or Khyber Pakhtunkhwa's mountain regions.",
      coverImage: "https://picsum.photos/seed/e1d2639e2c/1200/780",
      tags: ["Packing", "Guide"],
    },
    {
      slug: "top-5-lakes-pakistan",
      title: "Top 5 Lakes You Must See in Pakistan",
      excerpt: "From Saif-ul-Malook to Attabad, Pakistan's most photogenic lakes.",
      content: "Pakistan is home to some of the most stunning alpine lakes in the world. Here are five you should add to your bucket list, along with tips on the best time to visit each one.",
      coverImage: "https://picsum.photos/seed/1b4ad5b2d3/1200/780",
      tags: ["Lakes", "Bucket List"],
    },
  ];
  for (const b of blogsData) {
    await prisma.blog.upsert({ where: { slug: b.slug }, update: {}, create: b });
  }

  // --- Gallery ---
  const galleryData = [
    { title: "Hunza Valley Sunrise", category: "landscape", imageUrl: "https://picsum.photos/seed/604ce9b84c/1200/780", order: 1 },
    { title: "Deosai Plains", category: "landscape", imageUrl: "https://picsum.photos/seed/e1d2639e2c/1200/780", order: 2 },
    { title: "Swat River", category: "landscape", imageUrl: "https://picsum.photos/seed/6f56f65bb6/1200/780", order: 3 },
    { title: "Local Culture", category: "culture", imageUrl: "https://picsum.photos/seed/e8521c0985/1200/780", order: 4 },
    { title: "Trekking Group", category: "adventure", imageUrl: "https://picsum.photos/seed/59cd8d9be8/1200/780", order: 5 },
  ];
  for (const g of galleryData) {
    await prisma.galleryImage.create({ data: g });
  }

  // --- FAQs ---
  const faqData = [
    { question: "Do you arrange visa assistance?", answer: "We provide guidance and invitation letters for tourist visa applications where required.", category: "booking", order: 1 },
    { question: "What payment methods do you accept?", answer: "This platform currently works on an inquiry basis. Our team will contact you to confirm payment details after you submit an inquiry.", category: "booking", order: 2 },
    { question: "Is it safe to travel in northern Pakistan?", answer: "Yes, northern Pakistan is a well-established and welcoming tourist region. Our tours include experienced local guides.", category: "safety", order: 3 },
    { question: "Can tours be customized?", answer: "Absolutely — contact us with your preferred dates, group size and interests for a custom itinerary.", category: "booking", order: 4 },
  ];
  for (const f of faqData) {
    await prisma.fAQ.create({ data: f });
  }

  // --- Hero Slides ---
  const heroData = [
    { title: "Discover the Roof of the World", subtitle: "Curated tours across Hunza, Skardu & beyond", image: "https://picsum.photos/seed/390e0c4757/1600/1040", ctaLabel: "Explore Tours", ctaHref: "/tours", order: 1 },
    { title: "Adventure Awaits in the Karakoram", subtitle: "Trekking, jeep safaris and alpine lakes", image: "https://picsum.photos/seed/49f74ddc3c/1600/1040", ctaLabel: "View Destinations", ctaHref: "/destinations", order: 2 },
    { title: "Culture, Cuisine & Hospitality", subtitle: "Experience Pakistan since 2019", image: "https://picsum.photos/seed/5063b13f18/1600/1040", ctaLabel: "Get in Touch", ctaHref: "/contact", order: 3 },
  ];
  for (const h of heroData) {
    await prisma.heroSlide.create({ data: h });
  }

  // --- Sample inquiries ---
  const firstTour = await prisma.tour.findFirst();
  if (firstTour) {
    await prisma.inquiry.create({
      data: {
        type: InquiryType.TOUR,
        name: "Ahmed Khan",
        email: "ahmed@example.com",
        phone: "+92 300 1234567",
        message: "Interested in a group of 6 for this tour in August.",
        guests: 6,
        tourId: firstTour.id,
        status: InquiryStatus.NEW,
      },
    });
  }

  console.log("Seed complete.");
  console.log(`Admin login -> email: ${adminEmail} / password: ${adminPassword}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
