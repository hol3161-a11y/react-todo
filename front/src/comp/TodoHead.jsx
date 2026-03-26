
import TodoStore from '../store/TodoStore'

function TodoHead() {
    const { get, count } = TodoStore();

    let filter = count.filter(item=> item.isdone === true)
    
    return (
        <div className='header'>
            <h2>To Do List !</h2>
            <div className='container'>
                <div>할일 ({count.length}) / 완료 ({filter.length})</div> 

                <div className='btn'>
                    <button onClick={e => get('all')}>전체</button>
                    <button onClick={e => get(false)}>진행</button>
                    <button onClick={e => get(true)}>완료</button>
                </div>
            </div>
        </div>
    )
}

export default TodoHead