import{_ as S,a as C}from"./D00Wd361.js";import{_ as M}from"./BdkSFs0P.js";import{_ as N}from"./DPwqnZr_.js";import{r as g,B as U,D,j as u,P as f,f as F,c as i,a as s,s as I,x as P,t as l,q as t,b as _,F as h,v as j,o as n}from"./DzDDBNN_.js";const q={class:"container mx-auto px-4 py-8"},E={key:0},R={key:1,class:"grid gap-8 md:grid-cols-[2fr_1fr]"},z={class:"space-y-6"},A={class:"bg-white rounded-lg shadow p-6 space-y-4 text-3xl"},G=["src","alt"],H={class:"font-medium"},J={class:"text-gray-600"},X={__name:"subscriptions",setup(K){const r=g(!1),m=U(),p=D(),d=u(()=>p.videoList),L=u(()=>d.value.filter(a=>a.recommended)),c=f("showLoginModal",()=>!1),x=f("isLoggedIn",()=>!1),v=u(()=>m.userList),y=g([{id:1,username:"用戶1",avatar:"/placeholder.svg?height=40&width=40",content:"這個視頻真的很棒!"},{id:2,username:"用戶2",avatar:"/placeholder.svg?height=40&width=40",content:"學到了很多,謝謝分享!"}]),w=a=>{x.value=!0,c.value=!1,console.log(`${a} 已登入`)},V=()=>{r.value=!r.value,console.log("dd",r.value)};return F(async()=>{await m.getUsers(),await p.getVideo(),console.log("用戶列表:",v.value)}),(a,e)=>{const k=S,b=M,$=N,B=C;return n(),i(h,null,[s("main",q,[s("span",null,l(a.sub),1),t(d)?(n(),i("div",E,[_(k,{videoList:t(d)},null,8,["videoList"])])):(n(),i("div",R,[s("div",z,[_(b),s("div",A,[s("div",{class:"cursor-pointer",onClick:V},e[1]||(e[1]=[s("p",null,"55666",-1)])),s("div",null,l(t(v)),1),e[2]||(e[2]=s("h2",{class:"text-xl font-bold"},"評論",-1)),(n(!0),i(h,null,j(t(y),o=>(n(),i("div",{key:o.id,class:"flex space-x-4"},[s("img",{src:o.avatar,alt:o.username,class:"w-10 h-10 rounded-full"},null,8,G),s("div",null,[s("p",H,l(o.username),1),s("p",J,l(o.content),1)])]))),128))])]),_($,{videoList:t(L)},null,8,["videoList"])]))]),t(c)?(n(),I(B,{key:0,onClose:e[0]||(e[0]=o=>c.value=!1),onLogin:w})):P("",!0)],64)}}};export{X as default};
