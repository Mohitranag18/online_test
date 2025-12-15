export const studentCourses = [
  {
    id: 1,
    title: 'Python Fundamentals',
    subtitle: 'Data Structures & Algorithms',
    instructor: 'Prof. Sarah Chen',
    level: 'Advanced',
    rating: 4.8,
    students: 5200,
    duration: '40 hours',
    progress: 72,
    color: 'cyan',
    icon: 'code',
    status: 'In Progress',
    enrolled: true,
    category: 'Programming'
  },
  {
    id: 2,
    title: 'Web Development Basics',
    subtitle: 'HTML/CSS/JavaScript',
    instructor: 'Prof. Emma Johnson',
    level: 'Intermediate',
    rating: 4.6,
    students: 3800,
    duration: '35 hours',
    progress: 45,
    color: 'blue',
    icon: 'html',
    status: 'In Progress',
    enrolled: true,
    category: 'Web Development'
  },
  {
    id: 3,
    title: 'Java Full-Stack Development',
    subtitle: 'Enterprise Development',
    instructor: 'Dr. Michael Wong',
    level: 'Advanced',
    rating: 4.9,
    students: 6400,
    duration: '52 hours',
    progress: 28,
    color: 'orange',
    icon: 'java',
    status: 'In Progress',
    enrolled: true,
    category: 'Programming'
  },
  {
    id: 4,
    title: 'C Programming Basics',
    subtitle: 'Foundation Course',
    instructor: 'Prof. David Lee',
    level: 'Beginner',
    rating: 4.7,
    students: 4200,
    duration: '30 hours',
    progress: 60,
    color: 'green',
    icon: 'c',
    status: 'In Progress',
    enrolled: true,
    category: 'Programming'
  },
  {
    id: 5,
    title: 'React Advanced Patterns',
    subtitle: 'Modern Web Development',
    instructor: 'Prof. Alex Turner',
    level: 'Advanced',
    rating: 4.9,
    students: 3200,
    duration: '45 hours',
    progress: 0,
    color: 'indigo',
    icon: 'code',
    status: 'Not Started',
    enrolled: false,
    category: 'Web Development'
  },
  {
    id: 6,
    title: 'Machine Learning Basics',
    subtitle: 'Introduction to AI',
    instructor: 'Dr. Lisa Wang',
    level: 'Intermediate',
    rating: 4.8,
    students: 7800,
    duration: '60 hours',
    progress: 100,
    color: 'purple',
    icon: 'code',
    status: 'Completed',
    enrolled: true,
    category: 'Data Science'
  },
  {
    id: 7,
    title: 'Node.js Backend Development',
    subtitle: 'Server-side JavaScript',
    instructor: 'Prof. Robert Kim',
    level: 'Intermediate',
    rating: 4.7,
    students: 4500,
    duration: '38 hours',
    progress: 0,
    color: 'green',
    icon: 'code',
    status: 'Not Started',
    enrolled: false,
    category: 'Web Development'
  },
  {
    id: 8,
    title: 'iOS App Development',
    subtitle: 'Swift Programming',
    instructor: 'Dr. Jennifer Martinez',
    level: 'Advanced',
    rating: 4.9,
    students: 3100,
    duration: '55 hours',
    progress: 0,
    color: 'blue',
    icon: 'code',
    status: 'Not Started',
    enrolled: false,
    category: 'Mobile Dev'
  },
  {
    id: 9,
    title: 'Database Design & SQL',
    subtitle: 'Relational Databases',
    instructor: 'Prof. Thomas Anderson',
    level: 'Beginner',
    rating: 4.6,
    students: 5600,
    duration: '28 hours',
    progress: 0,
    color: 'orange',
    icon: 'code',
    status: 'Not Started',
    enrolled: false,
    category: 'Data Science'
  },
  {
    id: 10,
    title: 'AWS Cloud Computing',
    subtitle: 'Infrastructure as Code',
    instructor: 'Dr. Michelle Chen',
    level: 'Advanced',
    rating: 4.8,
    students: 4200,
    duration: '48 hours',
    progress: 0,
    color: 'yellow',
    icon: 'code',
    status: 'Not Started',
    enrolled: false,
    category: 'Cloud Computing'
  }
];

// Helper functions
export const getAllStudentCourses = () => studentCourses;

export const getEnrolledCourses = () => 
  studentCourses.filter(course => course.enrolled);

export const getCompletedCourses = () => 
  studentCourses.filter(course => course.progress === 100);

export const getCoursesByCategory = (category) => 
  studentCourses.filter(course => course.category === category);

export const getCourseById = (id) => 
  studentCourses.find(course => course.id === parseInt(id));