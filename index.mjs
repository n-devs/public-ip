import cron from 'node-cron'
import { publicIpv4 } from 'public-ip'
import fs from 'fs'
import ghpages from 'gh-pages'

const data = {
    ipv4: ""
};



async function updateIp() {
    data.ipv4 = await publicIpv4();

    // อ่านไฟล์ JSON
    fs.readFile('dist/ip-address.json', 'utf8', (err, data) => {

        if (err) {
            console.error('เกิดข้อผิดพลาดขณะอ่านไฟล์:', err);
            return;
        }

        // แปลงสตริง JSON เป็นออบเจกต์ JavaScript
        const getJsonData = JSON.parse(data);

        if (getJsonData.ipv4 !== data.ipv4) {

            const jsonData = JSON.stringify(data);

            fs.writeFile('dist/ip-address.json', jsonData, (err) => {
                if (err) {
                    console.error('เกิดข้อผิดพลาดขณะเขียนไฟล์:', err);
                    return;
                }
                console.log('ไฟล์ JSON ถูกเขียนเรียบร้อยแล้ว');

                ghpages.publish('./', {
                    user: {
                        name: 'n-devs',
                        email: 'n.devs260340@gmail.com'
                    },
                    add: true,
                    message: 'Auto-generated commit',
                    branch: 'prod',
                    repo: 'https://' + process.env.GH_TOKEN + '@github.com/n-devs/public-ip.git',
                    silent: true
                }, (res) => {
                    console.log(res);
                    console.log('Update IP เรียบร้อยแล้ว');
                });
            });
        }

    });
}

updateIp()

// // กำหนดรันงานทุกวันเวลา 00:00 น.
// cron.schedule('00 0 * * *', () => {
//     console.log('รันงานทุกวันเวลา 00:00 น.');

//     // ใส่โค้ดที่ต้องการรันในนี้
//     updateIp()
// });

// // กำหนดรันงานทุกวันเวลา 00:30 น.
// cron.schedule('30 0 * * *', () => {
//     console.log('รันงานทุกวันเวลา 00:30 น.');

//     // ใส่โค้ดที่ต้องการรันในนี้
//     updateIp()
// });

// // กำหนดรันงานทุกวันเวลา 01:00 น.
// cron.schedule('00 1 * * *', () => {
//     console.log('รันงานทุกวันเวลา 01:00 น.');

//     // ใส่โค้ดที่ต้องการรันในนี้
//     updateIp()
// });

// // กำหนดรันงานทุกวันเวลา 01:30 น.
// cron.schedule('30 1 * * *', () => {
//     console.log('รันงานทุกวันเวลา 01:30 น.');

//     // ใส่โค้ดที่ต้องการรันในนี้
//     updateIp()
// });

// // กำหนดรันงานทุกวันเวลา 02:00 น.
// cron.schedule('00 2 * * *', () => {
//     console.log('รันงานทุกวันเวลา 02:00 น.');

//     // ใส่โค้ดที่ต้องการรันในนี้
//     updateIp()
// });

// // กำหนดรันงานทุกวันเวลา 01:30 น.
// cron.schedule('30 2 * * *', () => {
//     console.log('รันงานทุกวันเวลา 02:30 น.');

//     // ใส่โค้ดที่ต้องการรันในนี้
//     updateIp()
// });

// // กำหนดรันงานทุกวันเวลา 03:00 น.
// cron.schedule('00 3 * * *', () => {
//     console.log('รันงานทุกวันเวลา 03:00 น.');

//     // ใส่โค้ดที่ต้องการรันในนี้
//     updateIp()
// });

// // กำหนดรันงานทุกวันเวลา 03:30 น.
// cron.schedule('30 3 * * *', () => {
//     console.log('รันงานทุกวันเวลา 03:30 น.');

//     // ใส่โค้ดที่ต้องการรันในนี้
//     updateIp()
// });

// // กำหนดรันงานทุกวันเวลา 04:00 น.
// cron.schedule('00 4 * * *', () => {
//     console.log('รันงานทุกวันเวลา 04:00 น.');

//     // ใส่โค้ดที่ต้องการรันในนี้
//     updateIp()
// });

// // กำหนดรันงานทุกวันเวลา 04:30 น.
// cron.schedule('30 4 * * *', () => {
//     console.log('รันงานทุกวันเวลา 04:30 น.');

//     // ใส่โค้ดที่ต้องการรันในนี้
//     updateIp()
// });

// // กำหนดรันงานทุกวันเวลา 05:00 น.
// cron.schedule('00 5 * * *', () => {
//     console.log('รันงานทุกวันเวลา 05:00 น.');

//     // ใส่โค้ดที่ต้องการรันในนี้
//     updateIp()
// });

// // กำหนดรันงานทุกวันเวลา 05:30 น.
// cron.schedule('30 5 * * *', () => {
//     console.log('รันงานทุกวันเวลา 05:30 น.');

//     // ใส่โค้ดที่ต้องการรันในนี้
//     updateIp()
// });

// // กำหนดรันงานทุกวันเวลา 06:00 น.
// cron.schedule('00 6 * * *', () => {
//     console.log('รันงานทุกวันเวลา 06:00 น.');

//     // ใส่โค้ดที่ต้องการรันในนี้
//     updateIp()
// });

// // กำหนดรันงานทุกวันเวลา 06:30 น.
// cron.schedule('30 6 * * *', () => {
//     console.log('รันงานทุกวันเวลา 06:30 น.');

//     // ใส่โค้ดที่ต้องการรันในนี้
//     updateIp()
// });

// // กำหนดรันงานทุกวันเวลา 07:00 น.
// cron.schedule('00 7 * * *', () => {
//     console.log('รันงานทุกวันเวลา 07:00 น.');

//     // ใส่โค้ดที่ต้องการรันในนี้
//     updateIp()
// });

// // กำหนดรันงานทุกวันเวลา 07:30 น.
// cron.schedule('30 7 * * *', () => {
//     console.log('รันงานทุกวันเวลา 07:30 น.');

//     // ใส่โค้ดที่ต้องการรันในนี้
//     updateIp()
// });

// // กำหนดรันงานทุกวันเวลา 08:00 น.
// cron.schedule('00 8 * * *', () => {
//     console.log('รันงานทุกวันเวลา 08:00 น.');

//     // ใส่โค้ดที่ต้องการรันในนี้
//     updateIp()
// });

// // กำหนดรันงานทุกวันเวลา 08:30 น.
// cron.schedule('30 8 * * *', () => {
//     console.log('รันงานทุกวันเวลา 08:30 น.');

//     // ใส่โค้ดที่ต้องการรันในนี้
//     updateIp()
// });

// // กำหนดรันงานทุกวันเวลา 09:00 น.
// cron.schedule('00 9 * * *', () => {
//     console.log('รันงานทุกวันเวลา 09:00 น.');

//     // ใส่โค้ดที่ต้องการรันในนี้
//     updateIp()
// });

// // กำหนดรันงานทุกวันเวลา 09:30 น.
// cron.schedule('30 9 * * *', () => {
//     console.log('รันงานทุกวันเวลา 09:30 น.');

//     // ใส่โค้ดที่ต้องการรันในนี้
//     updateIp()
// });