import React, { useState } from 'react'
import TodoStore from '../store/TodoStore';


/* 첫번째 - 어떤 데이터 기록해야할지 데이터 저장 생각하기
{
  _id:12312
  content:'투두리스트' 입력창
  isdon: false/true 체크박스(완료)
  created:'2026-03-24' 
  update:'2026-03-25' 
}

순서
1. insert 저장 - 2. List 출력 - 3. item 버튼

onChange={e=>setIp(e.target.value)외우기!! input에 value를 쓰면 onChange 무조건 쓰기 
*/


function TodoInsert() {
  const{save} = TodoStore();
  const [ip, setIp] = useState(''); // value작업을 하면 무조건 useState 하기!!

  function handleSubmit(e) {
    e.preventDefault();


    if(!ip){
      alert('글을 작성하세요!')
      return;
    }
    //     const date = `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, '0')}.${String(today.getDate()).padStart(2, '0')} 
    // ${String(today.getHours()).padStart(2, '0').replace('','T')}:${String(today.getMinutes()).padStart(2, '0')}:${String(today.getSeconds()).padStart(2, '0')}`;
    
    const today = new Date(); //오늘 날짜 나오기
    const date = new Intl.DateTimeFormat('ko-KR',{
      year:'numeric',
      month:'2-digit',
      day:'2-digit',
      hour:'2-digit',
      minute:'2-digit',
      second:'2-digit'

    }).format(today).replace('오전','T').replaceAll('','');


    save({ content: ip, date , isdone:false })
    .then(()=>{
      setIp('');
      alert('저장완료!');
    })
  }

  return (
    <div className='add'>
      <form onSubmit={e => handleSubmit(e)}>
        <input type='text' value={ip} onChange={e => setIp(e.target.value)}></input>
        <button>Add</button>
      </form>
    </div>
  )
}

export default TodoInsert