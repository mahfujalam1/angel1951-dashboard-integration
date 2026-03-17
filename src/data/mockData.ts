import type { Shipment, User, Hub, Staff, Payment, Report, HubRequest } from '../types';

export const shipments: Shipment[] = [
  { id: '1', trackingId: '1.8NI23456', from: 'Bangladesh', to: 'United States', status: 'In Transit', assignedDate: 'Feb 17, 2026', customer: 'Ahmed Khan', weight: '2.5 kg', hub: 'Dubai Hub', staff: 'Rashid Ali' },
  { id: '2', trackingId: '1.8NI23457', from: 'Bangladesh', to: 'United Kingdom', status: 'Custom Processing', assignedDate: 'Feb 17, 2026', customer: 'Sara Begum', weight: '1.2 kg', hub: 'London Hub', staff: 'John Smith' },
  { id: '3', trackingId: '1.8NI23458', from: 'India', to: 'United States', status: 'Out of Delivery', assignedDate: 'Feb 18, 2026', customer: 'Karim Uddin', weight: '3.8 kg', hub: 'NY Hub', staff: 'Mike Davis' },
  { id: '4', trackingId: '1.8NI23459', from: 'Pakistan', to: 'Canada', status: 'Delivered', assignedDate: 'Feb 18, 2026', customer: 'Fatima Malik', weight: '0.9 kg', hub: 'Toronto Hub', staff: 'Emily Clark' },
  { id: '5', trackingId: '1.8NI23460', from: 'Bangladesh', to: 'Australia', status: 'At Hub', assignedDate: 'Feb 19, 2026', customer: 'Rahim Molla', weight: '4.1 kg', hub: 'Sydney Hub', staff: 'James Wong' },
  { id: '6', trackingId: '1.8NI23461', from: 'Sri Lanka', to: 'United States', status: 'Picked', assignedDate: 'Feb 19, 2026', customer: 'Dinesh Perera', weight: '1.7 kg', hub: 'LA Hub', staff: 'Carlos Ruiz' },
  { id: '7', trackingId: '1.8NI23462', from: 'Nepal', to: 'Germany', status: 'In Transit', assignedDate: 'Feb 20, 2026', customer: 'Sita Sharma', weight: '2.2 kg', hub: 'Berlin Hub', staff: 'Hans Mueller' },
  { id: '8', trackingId: '1.8NI23463', from: 'Bangladesh', to: 'France', status: 'Custom Processing', assignedDate: 'Feb 20, 2026', customer: 'Nasrin Akter', weight: '0.6 kg', hub: 'Paris Hub', staff: 'Pierre Dupont' },
  { id: '9', trackingId: '1.8NI23464', from: 'India', to: 'Japan', status: 'Delivered', assignedDate: 'Feb 21, 2026', customer: 'Priya Nair', weight: '1.4 kg', hub: 'Tokyo Hub', staff: 'Yuki Tanaka' },
  { id: '10', trackingId: '1.8NI23465', from: 'Bangladesh', to: 'Singapore', status: 'Out of Delivery', assignedDate: 'Feb 21, 2026', customer: 'Arif Hossain', weight: '3.0 kg', hub: 'Singapore Hub', staff: 'Li Wei' },
  { id: '11', trackingId: '1.8NI23466', from: 'Pakistan', to: 'UAE', status: 'At Hub', assignedDate: 'Feb 22, 2026', customer: 'Zara Ahmed', weight: '1.8 kg', hub: 'Dubai Hub', staff: 'Omar Sheikh' },
  { id: '12', trackingId: '1.8NI23467', from: 'Bangladesh', to: 'Malaysia', status: 'In Transit', assignedDate: 'Feb 22, 2026', customer: 'Rafi Islam', weight: '2.9 kg', hub: 'KL Hub', staff: 'Ahmad Razak' },
  { id: '13', trackingId: '1.8NI23468', from: 'India', to: 'United States', status: 'Delivered', assignedDate: 'Feb 23, 2026', customer: 'Ananya Roy', weight: '1.1 kg', hub: 'Chicago Hub', staff: 'David Johnson' },
  { id: '14', trackingId: '1.8NI23469', from: 'Bangladesh', to: 'Italy', status: 'Custom Processing', assignedDate: 'Feb 23, 2026', customer: 'Kamrul Hassan', weight: '2.3 kg', hub: 'Rome Hub', staff: 'Marco Rossi' },
  { id: '15', trackingId: '1.8NI23470', from: 'Nepal', to: 'United Kingdom', status: 'Picked', assignedDate: 'Feb 24, 2026', customer: 'Biraj Thapa', weight: '0.8 kg', hub: 'Manchester Hub', staff: 'Oliver Brown' },
];

export const users: User[] = [
  { id: '1', serialNo: '#12331', name: 'Ahmed Khan', phone: '08+ 123 456 789', email: 'ahmed.khan@gmail.com', location: 'Dhaka, Bangladesh', avatar: 'https://i.pravatar.cc/40?img=11', joinDate: 'Jan 12, 2025', totalOrders: 34, status: 'Active' },
  { id: '2', serialNo: '#12332', name: 'Sara Begum', phone: '08+ 987 654 321', email: 'sara.begum@yahoo.com', location: 'Chittagong, Bangladesh', avatar: 'https://i.pravatar.cc/40?img=12', joinDate: 'Feb 3, 2025', totalOrders: 12, status: 'Active' },
  { id: '3', serialNo: '#12333', name: 'Karim Uddin', phone: '08+ 111 222 333', email: 'karim.uddin@gmail.com', location: 'Sylhet, Bangladesh', avatar: 'https://i.pravatar.cc/40?img=13', joinDate: 'Mar 20, 2025', totalOrders: 7, status: 'Inactive' },
  { id: '4', serialNo: '#12334', name: 'Fatima Malik', phone: '08+ 444 555 666', email: 'fatima.malik@hotmail.com', location: 'Lahore, Pakistan', avatar: 'https://i.pravatar.cc/40?img=14', joinDate: 'Apr 5, 2025', totalOrders: 21, status: 'Active' },
  { id: '5', serialNo: '#12335', name: 'Rahim Molla', phone: '08+ 777 888 999', email: 'rahim.molla@gmail.com', location: 'Rajshahi, Bangladesh', avatar: 'https://i.pravatar.cc/40?img=15', joinDate: 'May 18, 2025', totalOrders: 9, status: 'Active' },
  { id: '6', serialNo: '#12336', name: 'Dinesh Perera', phone: '08+ 321 654 987', email: 'dinesh.p@gmail.com', location: 'Colombo, Sri Lanka', avatar: 'https://i.pravatar.cc/40?img=16', joinDate: 'Jun 7, 2025', totalOrders: 16, status: 'Active' },
  { id: '7', serialNo: '#12337', name: 'Sita Sharma', phone: '08+ 159 753 486', email: 'sita.sharma@gmail.com', location: 'Kathmandu, Nepal', avatar: 'https://i.pravatar.cc/40?img=17', joinDate: 'Jul 22, 2025', totalOrders: 5, status: 'Inactive' },
  { id: '8', serialNo: '#12338', name: 'Nasrin Akter', phone: '08+ 246 135 789', email: 'nasrin.akter@gmail.com', location: 'Comilla, Bangladesh', avatar: 'https://i.pravatar.cc/40?img=18', joinDate: 'Aug 11, 2025', totalOrders: 28, status: 'Active' },
  { id: '9', serialNo: '#12339', name: 'Priya Nair', phone: '08+ 852 741 963', email: 'priya.nair@gmail.com', location: 'Mumbai, India', avatar: 'https://i.pravatar.cc/40?img=19', joinDate: 'Sep 3, 2025', totalOrders: 44, status: 'Active' },
  { id: '10', serialNo: '#12340', name: 'Arif Hossain', phone: '08+ 369 258 147', email: 'arif.hossain@yahoo.com', location: 'Khulna, Bangladesh', avatar: 'https://i.pravatar.cc/40?img=20', joinDate: 'Oct 16, 2025', totalOrders: 3, status: 'Active' },
];

export const hubs: Hub[] = [
  { id: '1', hubNameId: 'Dubai Hub', hubLocation: 'Kerala, India', contactNumber: '+1 (470) 918 8533', status: 'Active', throughput: '120 Rcv / 85 Dep', manager: 'John Lim', email: 'dubai@Buan Enterprise.com', address: '55 Hillview Ave, Dubai UAE 669950', openDays: ['Mon','Tue','Wed','Thu','Fri'], hours: '09:00 AM - 06:00 PM', staffCount: 12 },
  { id: '2', hubNameId: 'London Hub', hubLocation: 'Andra Pradesh', contactNumber: '+1 (907) 555-0101', status: 'Active', throughput: '98 Rcv / 72 Dep', manager: 'Sarah Jones', email: 'london@Buan Enterprise.com', address: '12 Baker Street, London W1U 3BH', openDays: ['Mon','Tue','Wed','Thu','Fri','Sat'], hours: '08:00 AM - 07:00 PM', staffCount: 9 },
  { id: '3', hubNameId: 'NY Hub', hubLocation: 'Karnataka', contactNumber: '+1 (470) 918 6544', status: 'Active', throughput: '145 Rcv / 110 Dep', manager: 'Mike Davis', email: 'ny@Buan Enterprise.com', address: '350 Fifth Ave, New York NY 10118', openDays: ['Mon','Tue','Wed','Thu','Fri'], hours: '07:00 AM - 08:00 PM', staffCount: 18 },
  { id: '4', hubNameId: 'Singapore Hub', hubLocation: 'Tamil Nadu', contactNumber: '+1 (704) 555-0127', status: 'Active', throughput: '88 Rcv / 65 Dep', manager: 'Li Wei', email: 'sg@Buan Enterprise.com', address: '1 Marina Blvd, Singapore 018989', openDays: ['Mon','Tue','Wed','Thu','Fri','Sat'], hours: '08:00 AM - 06:00 PM', staffCount: 7 },
  { id: '5', hubNameId: 'Tokyo Hub', hubLocation: 'Karnataka', contactNumber: '+1 (480) 555-2501', status: 'Active', throughput: '76 Rcv / 55 Dep', manager: 'Yuki Tanaka', email: 'tokyo@Buan Enterprise.com', address: '2-1 Marunouchi, Tokyo 100-0005', openDays: ['Mon','Tue','Wed','Thu','Fri'], hours: '09:00 AM - 05:00 PM', staffCount: 6 },
  { id: '6', hubNameId: 'KL Hub', hubLocation: 'Andra Pradesh', contactNumber: '+1 (207) 555-1103', status: 'Active', throughput: '65 Rcv / 48 Dep', manager: 'Ahmad Razak', email: 'kl@Buan Enterprise.com', address: 'Jalan Bukit Bintang, Kuala Lumpur 55100', openDays: ['Mon','Tue','Wed','Thu','Fri','Sat'], hours: '09:00 AM - 06:00 PM', staffCount: 5 },
  { id: '7', hubNameId: 'Sydney Hub', hubLocation: 'Tamil Nadu', contactNumber: '+1 (480) 555-0103', status: 'Active', throughput: '92 Rcv / 78 Dep', manager: 'James Wong', email: 'sydney@Buan Enterprise.com', address: '1 Macquarie St, Sydney NSW 2000', openDays: ['Mon','Tue','Wed','Thu','Fri'], hours: '08:00 AM - 05:00 PM', staffCount: 8 },
  { id: '8', hubNameId: 'Toronto Hub', hubLocation: 'Karnataka', contactNumber: '+1 (203) 555-2322', status: 'Inactive', throughput: '0 Rcv / 0 Dep', manager: 'Emily Clark', email: 'toronto@Buan Enterprise.com', address: '100 Queen St W, Toronto ON M5H 2N2', openDays: ['Mon','Tue','Wed','Thu'], hours: '09:00 AM - 05:00 PM', staffCount: 4 },
  { id: '9', hubNameId: 'Paris Hub', hubLocation: 'Tamil Nadu', contactNumber: '+1 (470) 918 6577', status: 'Inactive', throughput: '0 Rcv / 0 Dep', manager: 'Pierre Dupont', email: 'paris@Buan Enterprise.com', address: '29 Rue La Boetie, Paris 75008', openDays: ['Mon','Tue','Wed','Thu','Fri'], hours: '09:00 AM - 06:00 PM', staffCount: 3 },
  { id: '10', hubNameId: 'Berlin Hub', hubLocation: 'Karnataka', contactNumber: '+1 (225) 555-2223', status: 'Inactive', throughput: '0 Rcv / 0 Dep', manager: 'Hans Mueller', email: 'berlin@Buan Enterprise.com', address: 'Unter den Linden 77, 10117 Berlin', openDays: ['Mon','Tue','Wed','Thu','Fri'], hours: '09:00 AM - 05:00 PM', staffCount: 4 },
];

export const staffList: Staff[] = [
  { id: '1', name: 'Ahmed Khan', role: 'Delivery', hub: 'Dubai Hub', status: 'Active', contact: '+34594 65 6418', avatar: 'https://i.pravatar.cc/40?img=21', email: 'ahmed@Buan Enterprise.com', joinDate: 'Jan 5, 2024', deliveries: 234 },
  { id: '2', name: 'Rashid Ali', role: 'Delivery', hub: 'Dubai Hub', status: 'Active', contact: '+34594 65 6419', avatar: 'https://i.pravatar.cc/40?img=22', email: 'rashid@Buan Enterprise.com', joinDate: 'Feb 12, 2024', deliveries: 189 },
  { id: '3', name: 'Carlos Ruiz', role: 'Delivery', hub: 'LA Hub', status: 'Inactive', contact: '+34594 65 6420', avatar: 'https://i.pravatar.cc/40?img=23', email: 'carlos@Buan Enterprise.com', joinDate: 'Mar 20, 2024', deliveries: 97 },
  { id: '4', name: 'Mike Davis', role: 'Manager', hub: 'NY Hub', status: 'Active', contact: '+34594 65 6421', avatar: 'https://i.pravatar.cc/40?img=24', email: 'mike@Buan Enterprise.com', joinDate: 'Apr 3, 2024', deliveries: 0 },
  { id: '5', name: 'Li Wei', role: 'Delivery', hub: 'Singapore Hub', status: 'Busy', contact: '+34594 65 6422', avatar: 'https://i.pravatar.cc/40?img=25', email: 'liwei@Buan Enterprise.com', joinDate: 'May 15, 2024', deliveries: 312 },
  { id: '6', name: 'James Wong', role: 'Warehouse', hub: 'Sydney Hub', status: 'Active', contact: '+34594 65 6423', avatar: 'https://i.pravatar.cc/40?img=26', email: 'james@Buan Enterprise.com', joinDate: 'Jun 22, 2024', deliveries: 0 },
  { id: '7', name: 'Emily Clark', role: 'Manager', hub: 'Toronto Hub', status: 'Active', contact: '+34594 65 6424', avatar: 'https://i.pravatar.cc/40?img=27', email: 'emily@Buan Enterprise.com', joinDate: 'Jul 8, 2024', deliveries: 0 },
  { id: '8', name: 'Yuki Tanaka', role: 'Delivery', hub: 'Tokyo Hub', status: 'Active', contact: '+34594 65 6425', avatar: 'https://i.pravatar.cc/40?img=28', email: 'yuki@Buan Enterprise.com', joinDate: 'Aug 19, 2024', deliveries: 156 },
];

export const payments: Payment[] = [
  { id: '1', customer: 'Ahmed Khan', paymentId: 'BN123456', type: 'Delivery', amount: '$120.00', method: 'Card', status: 'Active', date: '21 Feb 2026', avatar: 'https://i.pravatar.cc/40?img=31' },
  { id: '2', customer: 'Sara Begum', paymentId: 'BN123457', type: 'Delivery', amount: '$85.00', method: 'Card', status: 'Pending', date: '21 Feb 2026', avatar: 'https://i.pravatar.cc/40?img=32' },
  { id: '3', customer: 'Karim Uddin', paymentId: 'BN123458', type: 'Express', amount: '$200.00', method: 'Bank Transfer', status: 'Active', date: '21 Feb 2026', avatar: 'https://i.pravatar.cc/40?img=33' },
  { id: '4', customer: 'Fatima Malik', paymentId: 'BN123459', type: 'Delivery', amount: '$55.00', method: 'Card', status: 'Active', date: '20 Feb 2026', avatar: 'https://i.pravatar.cc/40?img=34' },
  { id: '5', customer: 'Rahim Molla', paymentId: 'BN123460', type: 'Standard', amount: '$70.00', method: 'Cash', status: 'Failed', date: '20 Feb 2026', avatar: 'https://i.pravatar.cc/40?img=35' },
  { id: '6', customer: 'Dinesh Perera', paymentId: 'BN123461', type: 'Delivery', amount: '$120.00', method: 'Card', status: 'Active', date: '19 Feb 2026', avatar: 'https://i.pravatar.cc/40?img=36' },
  { id: '7', customer: 'Sita Sharma', paymentId: 'BN123462', type: 'Express', amount: '$175.00', method: 'Card', status: 'Pending', date: '19 Feb 2026', avatar: 'https://i.pravatar.cc/40?img=37' },
  { id: '8', customer: 'Nasrin Akter', paymentId: 'BN123463', type: 'Delivery', amount: '$90.00', method: 'Bank Transfer', status: 'Active', date: '18 Feb 2026', avatar: 'https://i.pravatar.cc/40?img=38' },
  { id: '9', customer: 'Priya Nair', paymentId: 'BN123464', type: 'Standard', amount: '$45.00', method: 'Card', status: 'Active', date: '18 Feb 2026', avatar: 'https://i.pravatar.cc/40?img=39' },
];

export const reports: Report[] = [
  { id: '1', name: 'Juliu Jalal', description: 'Package delivered to wrong address. Need immediate resolution.', time: '8:38 AM', status: 'Pending' },
  { id: '2', name: 'Ali Hassan', description: 'Our Bachelor of Commerce program is ACBSP-accredited.', time: '9:14 AM', status: 'Replied', reply: 'We have reviewed your concern and the issue has been resolved.' },
  { id: '3', name: 'Mira Patel', description: 'Shipment delayed for 5 days without any update.', time: '10:02 AM', status: 'Replied', reply: 'Apologies for the delay. Your shipment is now back on track.' },
  { id: '4', name: 'Omar Sheikh', description: 'Cannot track my parcel using the tracking ID provided.', time: '11:30 AM', status: 'Replied', reply: 'The tracking ID has been updated. Please try again.' },
  { id: '5', name: 'Layla Ahmed', description: 'Refund request for cancelled shipment BN123445.', time: '2:15 PM', status: 'Pending' },
];

export const hubRequests: HubRequest[] = [
  { id: '1', hub: 'dindiniya', phone: '08+ 123 456 789', location: 'United States', store: "Shop Name John's...", type: 'hub' },
  { id: '2', hub: 'rashida store', phone: '08+ 987 654 321', location: 'United Kingdom', store: "Shop Name Mike's...", type: 'hub' },
  { id: '3', hub: 'karims shop', phone: '08+ 111 222 333', location: 'Australia', store: "Shop Name Karim's...", type: 'hub' },
  { id: '4', hub: 'fatima hub', phone: '08+ 444 555 666', location: 'Canada', store: "Shop Name Fatima's...", type: 'hub' },
];

export const userGrowthData = [
  { month: 'Jan', value: 60 }, { month: 'Feb', value: 85 }, { month: 'Mar', value: 95 },
  { month: 'Apr', value: 40 }, { month: 'May', value: 70 }, { month: 'Jun', value: 90 },
  { month: 'Jul', value: 55 }, { month: 'Aug', value: 30 }, { month: 'Sep', value: 45 },
  { month: 'Oct', value: 65 }, { month: 'Nov', value: 50 }, { month: 'Dec', value: 20 },
];

export const earningGrowthData = [
  { month: 'Jan', value: 20 }, { month: 'Feb', value: 55 }, { month: 'Mar', value: 75 },
  { month: 'Apr', value: 90 }, { month: 'May', value: 85 }, { month: 'Jun', value: 95 },
  { month: 'Jul', value: 70 }, { month: 'Aug', value: 50 }, { month: 'Sep', value: 40 },
  { month: 'Oct', value: 55 }, { month: 'Nov', value: 35 }, { month: 'Dec', value: 25 },
];
