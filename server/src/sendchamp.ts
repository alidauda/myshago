const sdk = require('api')('@sendchamp/v1.0#1bxhir2hkyyg62rn');
import { SendChampResponse } from "./types";
export function SendChamp(){
    sdk.auth('Bearer sendchamp_live_$2y$10$Po1E8lXXdb5Cg5pIC993red2d7s5PXEexPvqSHrWBVhMF3toiIcaW');
   sdk.sendOtp({
      meta_data: {first_name: 'myshago'},
      channel: 'sms',
      sender: 'myshago',
      token_type: 'numeric ',
      token_length: 4,
      expiration_time: 6,
      customer_mobile_number: '2349017566226'
    })
      .then((res: SendChampResponse) => console.log(res.code))
      .catch((err: any) => console.error(err));

 
}




sdk.auth('Bearer sendchamp_live_$2y$10$Po1E8lXXdb5Cg5pIC993red2d7s5PXEexPvqSHrWBVhMF3toiIcaW');
sdk.sendOtp({
  meta_data: {first_name: 'myshago'},
  channel: 'sms',
  sender: 'myshago',
  token_type: 'numeric ',
  token_length: 4,
  expiration_time: 6,
  customer_mobile_number: '2349017566226'
})
  .then((res: any) => console.log(res))
  .catch((err: any) => console.error(err));