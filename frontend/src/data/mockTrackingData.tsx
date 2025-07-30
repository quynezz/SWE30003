export const TrackingData = {
    "1": {
        orderId: "123456",
        status: "delivered",
        estimatedDelivery: "30/07/2025",
        steps: [
            { status: "Đã đặt hàng", date: "25/07/2025 10:00 AM", location: "Hồ Chí Minh", completed: true },
            { status: "Đang xử lý", date: "25/07/2025 02:00 PM", location: "Nhà Kho Củ Chi", completed: true },
            { status: "Đang vận chuyển", date: "27/07/2025 08:00 AM", location: "Cục Bưu Điện Đà Nẵng", completed: true },
            { status: "Đã giao hàng", date: "30/07/2025 09:00 AM", location: "Hà Nội", completed: true },
        ],
    },
    "2": {
        orderId: "789101",
        status: "in-transit",
        estimatedDelivery: "02/08/2025",
        steps: [
            { status: "Đã đặt hàng", date: "28/07/2025 09:00 AM", location: "Hồ Chí Minh", completed: true },
            { status: "Đang xử lý", date: "28/07/2025 03:00 PM", location: "Hồ Chí Minh", completed: true },
            { status: "Đang vận chuyển", date: "29/07/2025 06:00 AM", location: "Cần Thơ", completed: true },
            { status: "Đã giao hàng", date: "", location: "", completed: false },
        ],
    }
}

