 import {fa} from "./fa";
 import {en} from "./en";
 import {ar} from "./ar"
 import {ch} from "./ch"
 import {tu} from "./tu"
 let dictionary =Object.assign(fa,en,ar,ch,tu);
 global.slanguage=global.slanguage
const translate=(keyword)=> {
     let key=`${global.slanguage}_${keyword}`;
     return  dictionary[`${key}`] || keyword;
}

export default translate;


