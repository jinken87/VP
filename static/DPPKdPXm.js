import{a as _}from"./DjHRy0ud.js";import{c as r,o as n,F as v,n as x,a as s,b as w,r as p,O as g,P as c,Q as m,m as b,R as f}from"./DzOnPd9k.js";const y={class:"flex w-full flex-wrap gap-4"},k=["src"],q={__name:"VideoCard",props:{videoList:{type:Array,default:()=>[]}},setup(u){const a=u;return(t,l)=>{const i=_;return n(),r("div",y,[(n(!0),r(v,null,x(a.videoList,o=>(n(),r("div",{key:o.id},[s("video",{src:o.url,class:"w-[600px]",controls:""},null,8,k),w(i,{videoData:o},null,8,["videoData"])]))),128))])}}},V={class:"fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"},L={class:"bg-white p-8 rounded-lg w-96"},D={class:"mb-4"},$={class:"mb-4"},F={__name:"LoginModal",emits:["close","login"],setup(u,{emit:a}){const t=p(""),l=p(""),i=a,o=()=>{i("login",t.value)};return(h,e)=>(n(),r("div",V,[s("div",L,[e[5]||(e[5]=s("h2",{class:"text-2xl font-bold mb-4"},"登入",-1)),s("form",{onSubmit:g(o,["prevent"])},[s("div",D,[e[2]||(e[2]=s("label",{for:"username",class:"block mb-2"},"用戶名",-1)),c(s("input",{"onUpdate:modelValue":e[0]||(e[0]=d=>f(t)?t.value=d:null),id:"username",type:"text",class:"w-full px-3 py-2 border rounded",required:""},null,512),[[m,b(t)]])]),s("div",$,[e[3]||(e[3]=s("label",{for:"password",class:"block mb-2"},"密碼",-1)),c(s("input",{"onUpdate:modelValue":e[1]||(e[1]=d=>f(l)?l.value=d:null),id:"password",type:"password",class:"w-full px-3 py-2 border rounded",required:""},null,512),[[m,b(l)]])]),e[4]||(e[4]=s("button",{type:"submit",class:"w-full px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"}," 登入 ",-1))],32)])]))}};export{q as _,F as a};
