let fs = require("fs");
let puppeteer = require("puppeteer");
let pin = process.argv[2];
let age = process.argv[3];
age = parseInt(age);
let excel = require("xlsx");


(async() => {
    const browser = await puppeteer.launch({
            headless: false,
            slowMo: 100,
            defaultViewport: null,
            args: ["--start-maximized"],
        })
    const page = await browser.newPage();
    await page.goto("https://www.google.com/");

    await page.waitForSelector("input[type='text']", { visible: true })
    await page.type("input[type='text']", "cowin");
    await page.keyboard.press("Enter");
    await page.waitForSelector(".yuRUbf>a[href='https://www.cowin.gov.in/']", { visible: true })
    await page.click(".yuRUbf>a[href='https://www.cowin.gov.in/']");
    await page.waitForTimeout(2000);
    await page.waitForSelector("#mat-tab-label-1-1", { visible: true });
    await page.evaluate(() => document.querySelector("#mat-tab-label-1-1").click());
    await page.waitForSelector("input[appinputchar='pincode']", { visible: true });
    await page.type("input[appinputchar='pincode']", pin);
    await page.keyboard.press("Enter");
    if (age < 45 && age >= 18) {
        await page.waitForTimeout(500);
        await page.waitForSelector("input#c1", { visible: true });
        await page.evaluate(() => document.querySelector("#c1").click());
    } else if (age <= 44 && age > 18) {
        await page.waitForTimeout(500)
        await page.waitForSelector("input#ca1", { visible: true });
        await page.evaluate(() => document.querySelector("#ca1").click());

    } else {
        await page.waitForTimeout(500);
        await page.waitForSelector("input#c2", { visible: true });
        await page.evaluate(() => document.querySelector("#c2").click());
    }
    const result = await page.evaluate(() => {


            let centerarr = document.querySelectorAll(".main-slider-wrap.col.col-lg-3");
            console.log(centerarr.length);

            const data = [];
            for (let i = 0; i < centerarr.length; i++) {
                let city1 = centerarr[i].textContent;
                data.push(city1);
            }

            let date = [];
            let date_vaccination = document.querySelectorAll(".availability-date p");
            for (let i = 0; i < 7; i++) {
                let date_available = date_vaccination[i].textContent;
                date.push(date_available);

            }
            let slottt = []
            let slot = document.querySelectorAll("li.ng-star-inserted .slots-box");
            for (let i = 0; i < slot.length; i++) {
                slottt.push(slot[i].textContent);
            }

            let obj_vaccine = {
                city: data,
                dates: date,
                slots: slottt
            }

            return obj_vaccine;

        })
    
    for (let i = 0; i < 7; i++) {
        let fileNa = result.dates[i] + ".txt";
        if (fs.existsSync(fileNa)) {
            fs.unlinkSync(fileNa)
        }
    }
    let newWB = excel.utils.book_new();
        
    for (let i = 0; i < 7; i++) {
        let obj_arr =[]
        for (let j = 0; j < result.city.length; j++) {
            let obj = {};
            obj['Date'] = result.dates[i]
            obj['Center'] = result.city[j]
            for (let k = 0; k < result.slots.length; k++) {
                if (k % 7 == i && Math.floor(k / 7) == j) {
                    if (result.slots[k] == " NA ") {
                        obj['Vaccine_Name'] = 'NA'
                        obj['Dose_1'] = 'NA'
                        obj['Dose_2'] = 'NA'
                        obj['Total'] = 'NA'
                    } else {
                        let arr = result.slots[k].split(" ");
                        arr.splice(10);
                        obj['Vaccine_Name'] = arr[1]
                        obj['Dose_1']  = arr[4]
                        obj['Dose_2'] = arr[9]
                        obj['Total'] = arr[6]
                    }
                }
            }
            console.log(obj)
            obj_arr.push(obj)
            fs.appendFileSync("file.json",JSON.stringify(obj));
        }
        let newWS = excel.utils.json_to_sheet(obj_arr);
        excel.utils.book_append_sheet(newWB,newWS,result.dates[i]);
    }
    excel.writeFile(newWB,'Vaccinate.xlsx')
})();