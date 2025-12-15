export const mockCourses = {
    1: {
        id: 1,
        title: 'Introduction to Biology',
        description: 'Basic concepts of biology for beginners',
        status: 'Active',
        questions: 15,
        time: '20 min',
        completions: 32,
        created: 'Created just now',
        color: 'blue',
        modules: [
            {
                id: 1,
                name: 'Module_01',
                description: 'Basic cell structure and functions',
                events: [
                    { 
                        id: 1,
                        name: 'Cell Biology Quiz', 
                        type: 'quiz',
                        date: 'Today, 2:30 PM', 
                        participants: 32 
                    },
                    { 
                        id: 2,
                        name: 'DNA Structure Test', 
                        type: 'quiz',
                        date: 'Tomorrow, 10:00 AM', 
                        participants: 28 
                    },
                    { 
                        id: 3,
                        name: 'Photosynthesis Lesson', 
                        type: 'lesson',
                        date: 'May 20, 9:00 AM', 
                        participants: 45 
                    },
                ],
            },
            {
                id: 2,
                name: 'Module_02',
                description: 'Plant and animal biology',
                events: [
                    { 
                        id: 4,
                        name: 'Ecosystem Quiz', 
                        type: 'quiz',
                        date: 'Today, 3:00 PM', 
                        participants: 25 
                    },
                    { 
                        id: 5,
                        name: 'Animal Classification', 
                        type: 'lesson',
                        date: 'Tomorrow, 2:00 PM', 
                        participants: 30 
                    },
                ],
            },
        ],
    },
    2: {
        id: 2,
        title: 'Advanced Mathematics',
        description: 'Complex mathematical concepts',
        status: 'Inactive',
        questions: 20,
        time: '30 min',
        completions: 18,
        created: 'Created just now',
        color: 'indigo',
        modules: [
            {
                id: 1,
                name: 'Module_01',
                description: 'Calculus fundamentals',
                events: [
                    { 
                        id: 1,
                        name: 'Derivatives Quiz', 
                        type: 'quiz',
                        date: 'Today, 1:00 PM', 
                        participants: 15 
                    },
                    { 
                        id: 2,
                        name: 'Integration Practice', 
                        type: 'exercise',
                        date: 'Tomorrow, 11:00 AM', 
                        participants: 20 
                    },
                ],
            },
            {
                id: 2,
                name: 'Module_02',
                description: 'Linear algebra concepts',
                events: [
                    { 
                        id: 3,
                        name: 'Matrix Operations', 
                        type: 'quiz',
                        date: 'May 21, 10:00 AM', 
                        participants: 18 
                    },
                ],
            },
        ],
    },
    3: {
        id: 3,
        title: 'Chemistry Fundamentals',
        description: 'Basic chemistry principles',
        status: 'Draft',
        questions: 12,
        time: '25 min',
        completions: 5,
        created: 'Created just now',
        color: 'purple',
        modules: [
            {
                id: 1,
                name: 'Module_01',
                description: 'Atomic structure and periodic table',
                events: [
                    { 
                        id: 1,
                        name: 'Atomic Theory Quiz', 
                        type: 'quiz',
                        date: 'Today, 4:00 PM', 
                        participants: 10 
                    },
                ],
            },
        ],
    },
    4: {
        id: 4,
        title: 'Physics Mechanics',
        description: 'Understanding motion and forces',
        status: 'Active',
        questions: 18,
        time: '35 min',
        completions: 24,
        created: 'Created 2 days ago',
        color: 'green',
        modules: [
            {
                id: 1,
                name: 'Module_01',
                description: 'Newton\'s laws of motion',
                events: [
                    { 
                        id: 1,
                        name: 'Motion Quiz', 
                        type: 'quiz',
                        date: 'Today, 5:00 PM', 
                        participants: 20 
                    },
                ],
            },
        ],
    },
    5: {
        id: 5,
        title: 'English Literature',
        description: 'Classic and modern literature analysis',
        status: 'Draft',
        questions: 10,
        time: '15 min',
        completions: 8,
        created: 'Created 1 week ago',
        color: 'orange',
        modules: [
            {
                id: 1,
                name: 'Module_01',
                description: 'Shakespeare studies',
                events: [
                    { 
                        id: 1,
                        name: 'Romeo and Juliet Quiz', 
                        type: 'quiz',
                        date: 'Tomorrow, 3:00 PM', 
                        participants: 12 
                    },
                ],
            },
        ],
    },
};

// Helper function to get all courses as an array
export const getAllCourses = () => {
    return Object.values(mockCourses);
};

// Helper function to get active courses
export const getActiveCourses = () => {
    return Object.values(mockCourses).filter(course => course.status === 'Active');
};

// Helper function to get draft courses
export const getDraftCourses = () => {
    return Object.values(mockCourses).filter(course => course.status === 'Draft');
};

// Helper function to get inactive courses
export const getInactiveCourses = () => {
    return Object.values(mockCourses).filter(course => course.status === 'Inactive');
};

// Helper function to get a single course by ID
export const getCourseById = (id) => {
    return mockCourses[parseInt(id)] || null;
};

// Helper function to get modules for a specific course
export const getModulesByCourseId = (courseId) => {
    const course = mockCourses[parseInt(courseId)];
    return course ? course.modules : [];
};

// Helper function to get a specific module from a course
export const getModuleById = (courseId, moduleId) => {
    const course = mockCourses[parseInt(courseId)];
    if (!course || !course.modules) return null;
    return course.modules.find(m => m.id === parseInt(moduleId)) || null;
};