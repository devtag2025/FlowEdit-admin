import { 
  Activity, 
  Clock, 
  Users, 
  Briefcase,
} from 'lucide-react';
 export const stats = [
    {
      icon: Activity,
      title: 'Project Monthly Revenue',
      value: '$127,400',
      trend: 'MoM +8%',
      type: 'revenue',
      progress: null
    },
    {
      icon: Clock,
      title: 'Active Projects',
      value: '42',
      subtitle: null,
      type: 'capacity',
      progress: {
        current: 42,
        total: 60
      }
    },
    {
      icon: Users,
      title: 'Clients',
      value: '78',
      subtitle: null,
      type: 'pie',
      progress: {
        segments: [130],
        labels: ['65% Enterprise', '35% SMB']
      }
    },
    {
      icon: Briefcase,
      title: 'Contractors',
      value: '23',
      subtitle: null,
      type: 'split',
      progress: {
        active: 14,
        available: 9
      }
    }
  ];

 export const filters = ['All', 'Submitted', 'Processing', 'Review', 'Error', 'Complete'];

export const projects = [
  {
    id: 1,
    name: "Summer Campaign Promo",
    status: "Review",
    lastUpdated: "10/25/2025",
    progress: 80,
    contractor: {
      name: "Sarah Kim",
      avatar: "https://i.pravatar.cc/100?img=32",
    },
  },
  {
    id: 2,
    name: "Product Unboxing v2",
    status: "Processing",
    lastUpdated: "10/25/2025",
    progress: 45,
    contractor: {
      name: "Marvin McKinney",
      avatar: "https://i.pravatar.cc/100?img=12",
    },
  },
  {
    id: 3,
    name: "Testimonial Compilation",
    status: "Complete",
    lastUpdated: "10/25/2025",
    progress: 100,
    contractor: {
      name: "Wade Warren",
      avatar: "https://i.pravatar.cc/100?img=18",
    },
  },
  {
    id: 4,
    name: "Halloween Special",
    status: "Submitted",
    lastUpdated: "10/25/2025",
    progress: 30,
    contractor: {
      name: "Jane Cooper",
      avatar: "https://i.pravatar.cc/100?img=5",
    },
  },
];
