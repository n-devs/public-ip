import cron from 'node-cron'
import { publicIpv4 } from 'public-ip'
import fs from 'fs'
import ghpages from 'gh-pages'

const data = {
    ipv4: ""
};



async function updateIp() {

    data.ipv4 = await publicIpv4();

    const jsonData = JSON.stringify(data, null, 2);

    fs.writeFile('ip-address.json', jsonData, (err) => {
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
            branch: 'main',
            repo: 'https://' + process.env.GH_TOKEN + '@github.com/n-devs/public-ip.git',
            silent: true
        }, (res) => {
            console.log(res);
            console.log('Update IP เรียบร้อยแล้ว');
        });
    });
}


updateIp()


// // กำหนดงานที่จะทำทุกๆ 1 ชั่วโมง
// cron.schedule('0 * * * *', () => {
//     console.log('รันงานทุกๆ 1 ชั่วโมง');

//     // ใส่โค้ดที่ต้องการรันในนี้
//     updateIp()
// });