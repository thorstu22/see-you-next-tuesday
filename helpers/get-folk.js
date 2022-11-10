const axios = require('axios')
const fs = require('fs');
const path = require('path')
const { savePersonToFile } = require('./helpers/utils')

const brackets = ['1000000', '5000000', '100000000000']

axios.defaults.headers.common['X-Api-Key'] = 'p92LdhgBG1aqPTT37N61QA==hjcmYSYzCzvIv2t2';


const peopleInPromiseArray = []
async function doIt() {

    for (const bracket of brackets) {
        const {data: people} = await axios({
         method: 'GET',
         url: `https://api.api-ninjas.com/v1/celebrity?min_net_worth=${bracket}`,
     })     
         for (const folk of people) {
             //Transform the name ()/captilize the name
             const forenameAndSurnameAsAnArray = folk.name.split(" ")
     
             for (let i = 0; i < forenameAndSurnameAsAnArray.length; i++) {
                 forenameAndSurnameAsAnArray[i] = forenameAndSurnameAsAnArray[i][0].toUpperCase() + forenameAndSurnameAsAnArray[i].substr(1);
             }
             const joinedName = forenameAndSurnameAsAnArray.join("+");
     
             await savePersonToFile(joinedName) // void function. BAD.
         }
     }
}
Promise.resolve(doIt())
