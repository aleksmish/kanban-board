import { useEffect, useRef, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import AddIcon from '@mui/icons-material/Add';

function App() {
  const [boards, setBoards] = useState([
    {id: 1, title: 'Сделать', items:[]},
    {id: 2, title: 'В работе', items:[]},
    {id: 3, title: 'Завершено', items:[]},
    {id: 4, title: 'На доработку', items:[]}
  ])

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('items'))
    if (items){
      setBoards(items)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(boards))
  }, [boards])

  const [currentBoard, setCurrentBoard] = useState(null)
  const [currentItem, setCurrentItem] = useState(null)
  const [card, setCard] = useState('')
  const inputRefs= useRef(new Array())

  function dragOverHandler(e){
    e.preventDefault()
  }

  function dragStartHandler(e, board, item){
    setCurrentBoard(board)
    setCurrentItem(item)
  }

  function dropHandler(e, board, item){
    e.stopPropagation()
    const currentIndex = currentBoard.items.indexOf(currentItem)
    currentBoard.items.splice(currentIndex,1)
    const dropIndex = board.items.indexOf(item)
    board.items.splice(dropIndex + 1, 0 ,currentItem)

    setBoards(boards.map(b => {
      if(b.id === board.id){
        return board
      }
      if(b.id === currentBoard.id){
        return currentBoard
      }
      return b
    }))
  }

  function dropCardHandler(e, board) {
    board.items.push(currentItem)
    const currentIndex = currentBoard.items.indexOf(currentItem)
    currentBoard.items.splice(currentIndex,1)

    setBoards(boards.map(b => {
      if(b.id === board.id){
        return board
      }
      if(b.id === currentBoard.id){
        return currentBoard
      }
      return b
    }))
  }

  function addHandler(e, board) {
    if (!card || !card.trim()) return
    const newCard = {id: Date.now(), title: card}
    board.items.push(newCard)
    setBoards(boards.map(b => {
      if(b.id === board.id){
        return board
      }
      if(b.id === currentBoard?.id){
        return currentBoard
      }
      return b
    }))
    setCard('')
  }

  function deleteHandler(e, board, item) {
    const deleteIndex = board.items.indexOf(item)
    board.items.splice(deleteIndex, 1)

    setBoards(boards.map(b => {
      if(b.id === board.id){
        return board
      }
      if(b.id === currentBoard?.id){
        return currentBoard
      }
      return b
    }))
  }

  const addToRefs = (el) => {
    if(el && !inputRefs.current.includes(el)){
      inputRefs.current.push(el)
    }
  }

  return (
    <div className="App overflow-y-hidden h-[100vh] select-none">
      <Navbar/>
        <div 
          className='kanban_board gap-1 flex p-2 min-w-[800px] h-[93%]'
        >
          {boards.map(board => 
            <div 
              key={board.id} 
              className={'board border-[5px] border-solid border-[#23272A] w-[25%] text-sm overflow-auto'}
              onDragOver={(e) => dragOverHandler(e)}
              onDrop={(e) => dropCardHandler(e, board)}
              >

              <div 
                className='text-xl text-center p-2 flex items-center justify-between select-none '
                >
                <p className='inline-block text-title'>{board.title}</p>
                <label htmlFor={board.id} className="btn bg-addBtn border-addBtn modal-button w-[15px] h-[20px]"><AddIcon fontSize='small' style={{color: 'white'}}/></label>
              </div>
            
              <input type="checkbox" id={board.id} onChange={e => inputRefs.current[board.id - 1].focus()} className="modal-toggle" />
              <div className="modal">
                <div className="modal-box relative">
                  <label htmlFor={board.id} className="btn btn-sm btn-circle absolute right-2 top-2" onClick={(e) => setCard('')}>✕</label>
                  <h3 className="text-lg font-bold text-center p-5 mb-7">Добавить новую задачу</h3>
                  <input ref={addToRefs} autoFocus type="text" placeholder="Задача" className="input input-bordered input-primary w-full max-w-xs" value={card} onChange={(e) => setCard(e.target.value)}/>
                  <button className="btn btn-active btn-primary ml-5" onClick={(e) => addHandler(e, board)}>Добавить</button>
                </div>
              </div>
              
              {board.items.map(item => 
                  <div key={item.id} className="flex break-all ">
                    <label htmlFor={item.id} className="modal-button item text-sm text-text mx-2 my-1 border-border border-[2px] p-2 w-[100%]">
                      <div key={item.id}
                      className="width-[100%] height-[100%]"
                      onDragOver={(e) => dragOverHandler(e)}
                      onDragStart={(e) => dragStartHandler(e, board, item)}
                      onDrop={(e) => dropHandler(e, board, item)}
                      draggable={true}
                      >
                        {item.title}
                      </div>
                    </label>
                  
                  <input type="checkbox" id={item.id} className="modal-toggle" />
                  <div 
                    className="modal"
                    >
                    <div 
                      className="modal-box">
                      <h3 className="font-bold text-lg">Удалить?</h3>
                      <div className="modal-action">
                        <label htmlFor={item.id} className="btn">Нет</label>
                        <label htmlFor={item.id} className="btn" onClick={(e) => deleteHandler(e, board, item)}>Да</label>
                      </div>
                    </div>
                  </div>

                </div>
                )}
            </div>
        )}
        </div>
    </div>
  );
}

export default App;
