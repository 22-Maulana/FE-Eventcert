// Fungsi helper untuk menghasilkan ID yang aman untuk URL (slug)
const slugify = (text) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Hapus karakter non-word
    .replace(/[\s_-]+/g, '-') // Ganti spasi/underscore dengan dash
    .replace(/^-+|-+$/g, ''); // Hapus dash di awal/akhir
};

// Data detail tambahan (untuk halaman detail)
const extraDetail = {
    description: "Event ini adalah wadah kolaborasi bagi para inovator dan peneliti muda. Kami menghadirkan berbagai kegiatan seperti kompetisi, seminar, dan workshop teknologi terkini, mendorong lahirnya ide baru yang berdampak bagi masa depan. Jangan lewatkan kesempatan untuk bertemu dengan para ahli!",
    speakers: ['Prof. Dr. Amelia Tan (AI Specialist)', 'Ir. Budi Santoso, M.Kom (Startup Founder)', 'Dr. Rina Dewi (Tech Researcher)'],
    schedule: [
        { time: '08:00', activity: 'Registrasi & Networking' },
        { time: '09:00', activity: 'Opening Ceremony & Keynote Speech' },
        { time: '11:00', activity: 'Parallel Workshop Sesi 1' },
        { time: '13:00', activity: 'Istirahat & Makan Siang' },
        { time: '14:00', activity: 'Sesi Pitching Startup Terbaik' },
        { time: '16:00', activity: 'Closing Remarks & Pengumuman Pemenang' },
    ],
    is_registered: false, // Contoh properti untuk status registrasi
};

// Data Event Mendatang (Upcoming Events)
export const upcomingEvents = [
  {
    title: "Hackathon Innovate 2025",
    date: "10–12 November 2025",
    location: "Jakarta Convention Center",
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80",
    ...extraDetail // Tambahkan detail tambahan
  },
  {
    title: "Tech Research Expo",
    date: "25 November 2025",
    location: "Surabaya Tech Park",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
    ...extraDetail 
  },
  {
    title: "Startup Pitch Battle",
    date: "5 Desember 2025",
    location: "Bandung Digital Valley",
    image:
      "https://images.unsplash.com/photo-1532619187608-e5375cab36aa?auto=format&fit=crop&w=800&q=80",
    ...extraDetail 
  },
].map(event => ({ ...event, id: slugify(event.title) })); // Tambahkan ID

// Data Event yang Sudah Lewat (Past Events)
export const pastEvents = [
  {
    title: "Tech Future Summit 2024",
    date: "November 2024",
    location: "Jakarta",
    image:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80",
    ...extraDetail 
  },
  {
    title: "AI Forum Asia 2024",
    date: "September 2024",
    location: "Singapore",
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80", // AI concept image
    ...extraDetail 
  },
  {
    title: "InnoVerse Hackathon 2024",
    date: "August 2024",
    location: "Surabaya",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
    ...extraDetail 
  },
  {
    title: "Global Startup Expo 2023",
    date: "December 2023",
    location: "Kuala Lumpur",
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
    ...extraDetail 
  },
  {
    title: "Blockchain World Conference 2023",
    date: "October 2023",
    location: "Dubai",
    image:
      "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?auto=format&fit=crop&w=800&q=80",
    ...extraDetail 
  },
  {
    title: "Sustainable Tech Forum 2023",
    date: "July 2023",
    location: "Tokyo",
    image:
      "https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&w=800&q=80",
    ...extraDetail 
  },
  {
    title: "Digital Economy Summit 2022",
    date: "November 2022",
    location: "Bangkok",
    image:
      "https://images.unsplash.com/photo-1551836022-4c4c79ecde51?auto=format&fit=crop&w=800&q=80",
    ...extraDetail 
  },
  {
    title: "Future of Mobility Forum 2022",
    date: "September 2022",
    location: "Berlin",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
    ...extraDetail 
  },
  {
    title: "Smart City Expo 2021",
    date: "June 2021",
    location: "Seoul",
    image:
      "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=800&q=80",
    ...extraDetail 
  },
  {
    title: "Green Energy Week 2021",
    date: "March 2021",
    location: "Melbourne",
    image:
      "https://images.unsplash.com/photo-1504386106331-3e4e71712b38?auto=format&fit=crop&w=800&q=80",
    ...extraDetail 
  },
  {
    title: "AI & Robotics Conference 2020",
    date: "December 2020",
    location: "London",
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80", // tema robotika
    ...extraDetail 
  },
  {
    title: "Global Innovation Forum 2020",
    date: "October 2020",
    location: "San Francisco",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
    ...extraDetail 
  },
  {
    title: "Women in Tech Summit 2019",
    date: "August 2019",
    location: "New York",
    image:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80",
    ...extraDetail 
  },
  {
    title: "Data Science Expo 2019",
    date: "May 2019",
    location: "Singapore",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    ...extraDetail 
  },
  {
    title: "Global Tech Meetup 2018",
    date: "December 2018",
    location: "Jakarta",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
    ...extraDetail 
  },
  {
    title: "Startup Asia Conference 2018",
    date: "October 2018",
    location: "Bangkok",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
    ...extraDetail 
  },
  {
    title: "Innovators Connect 2017",
    date: "June 2017",
    location: "Kuala Lumpur",
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80", // creative innovation event
    ...extraDetail 
  },
  {
    title: "AI Frontiers 2017",
    date: "February 2017",
    location: "Seoul",
    image:
      "https://images.unsplash.com/photo-1504386106331-3e4e71712b38?auto=format&fit=crop&w=800&q=80",
    ...extraDetail 
  },
].map(event => ({ 
    // Tambahkan ID unik, menggunakan judul dan tahun/bulan jika judul sama
    ...event, 
    id: slugify(event.title + '-' + event.date.split(' ')[1]) 
}));

// Gabungkan semua event dalam satu array
export const allEvents = [...upcomingEvents, ...pastEvents];

/**
 * Mencari detail event berdasarkan ID (slug)
 * @param {string} id - ID unik (slug) dari event.
 * @returns {object|undefined} Objek event atau undefined jika tidak ditemukan.
 */
export const getEventById = (id) => {
  return allEvents.find(event => event.id === id);
};