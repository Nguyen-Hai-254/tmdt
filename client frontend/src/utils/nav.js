export const navbarForAdmin = [
    {
        name: 'Trang chủ',
        url: '/'
    },
    {
        name: 'Quản lý học viên',
        url: '/admin/student'
    },
    {
        name: 'Quản lý đầu bếp',
        url: '/admin/chef'
    },
    {
        name: 'Quản lý khóa học',
        url: '/admin/course'
    }
]

export const navbarForChef = [
    {
        name: 'Trang chủ',
        url: '/'
    },
    {
        name: 'Khóa học của tôi',
        url: '/chef'
    },
    {
        name: 'Món ăn của tôi',
        url: '/all-food'
    },
    {
        name: 'Đăng khóa học',
        url: '/food-course-register'
    },
    {
        name: 'Đăng món ăn',
        url: '/food-register'
    }
]

export const navbarUser = [
    {
        name: 'Trang chủ',
        url: '/'
    },
    {
        name: 'Khóa học nấu ăn',
        url: '/course',
        subMenu: [
            {
                name: 'Món ăn ba miền',
                url: '/category/Món ăn ba miền'
            },
            {
                name: 'Món ăn đường phố',
                url: '/category/Món ăn đường phố'
            },
            {
                name: 'Món ngon cho mẹ và bé',
                url: '/category/Món ăn cho mẹ và bé'
            },
            {
                name: 'Pha chế tổng hợp',
                url: '/category/Pha chế tổng hợp'
            },
            // Thêm các khóa học khác tại đây
        ]
    },
    {
        name: 'Món ăn miễn phí',
        url: '/foods'
    },
    {
        name: 'Giới thiệu',
        url: '/#info'
    },
    {
        name: 'Liên hệ',
        url: '/#contact'
    }
]