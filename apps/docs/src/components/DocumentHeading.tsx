import {useLayoutEffect,useRef} from 'react'
import {useLocale} from '../app/locale'
export default function DocumentHeading({title,category}:{title:string;category?:{title:string;href:string}}){
 const {tr}=useLocale()
 const ref=useRef<HTMLElement>(null)
 useLayoutEffect(()=>{
  const header=ref.current,main=header?.parentElement;if(!header||!main)return
  const update=()=>main.style.setProperty('--page-heading-height',header.offsetHeight+'px')
  update();const observer=new ResizeObserver(update);observer.observe(header)
  return()=>{observer.disconnect();main.style.removeProperty('--page-heading-height')}
 },[])
 return <header className="desktop-document-heading" ref={ref}>
  <nav aria-label={tr('面包屑导航','Breadcrumb')}><ol><li><a href="#/tahoe/getting-started/introduction">{tr('开始使用','Getting started')}</a></li>{category&&<li><span aria-hidden="true">/</span><a href={category.href}>{category.title}</a></li>}<li><span aria-hidden="true">/</span><span aria-current="page">{title}</span></li></ol></nav>
  <h1>{title}</h1>
 </header>
}
