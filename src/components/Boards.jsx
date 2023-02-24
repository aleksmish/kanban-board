import React, { useRef, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { removeGhostElement } from '../helpers';
import Board from './Board';

const Boards = () => {
  const [boards, setBoards] = useLocalStorage('items', [
    { id: 1, title: 'Backlog', items: [] },
    { id: 2, title: 'To Do', items: [] },
    { id: 3, title: 'Ongoing', items: [] },
    { id: 4, title: 'Done', items: [] },
  ]);

  const [currentBoard, setCurrentBoard] = useState(null);
  const [currentItem, setCurrentItem] = useState(null);
  const [card, setCard] = useState('');
  const inputRefs = useRef(new Array());

  function dragOverHandler(e) {
    e.preventDefault();
  }

  function dragStartHandler(e, board, item) {
    const ghostElement = document.createElement('div');

    const text = e.target.innerText || e.target.textContent;
    let threshold = 300; // when width or height exceeds 300 ghostElement appears semi-transparent
    ghostElement.style.width = `${Math.min(e.target.offsetWidth, threshold)}px`;
    ghostElement.style.height = `${Math.min(
      e.target.offsetHeight,
      threshold
    )}px`;
    ghostElement.classList.add('dragging');
    ghostElement.classList.add('break-all');

    const span = document.createElement('span');
    span.innerText = text;

    ghostElement.appendChild(span);

    document.body.appendChild(ghostElement);
    e.dataTransfer.setDragImage(ghostElement, 0, 0);

    setCurrentBoard(board);
    setCurrentItem(item);
  }

  const dragEndHandler = (e) => {
    removeGhostElement();
  };

  function dropHandler(e, board, item) {
    removeGhostElement();
    e.stopPropagation();
    const currentIndex = currentBoard.items.indexOf(currentItem);
    currentBoard.items.splice(currentIndex, 1);
    const dropIndex = board.items.indexOf(item);
    board.items.splice(dropIndex + 1, 0, currentItem);

    setBoards(
      boards.map((b) => {
        if (b.id === board.id) {
          return board;
        }
        if (b.id === currentBoard.id) {
          return currentBoard;
        }
        return b;
      })
    );
  }

  function dropCardHandler(e, board) {
    removeGhostElement();
    board.items.push(currentItem);
    const currentIndex = currentBoard.items.indexOf(currentItem);
    currentBoard.items.splice(currentIndex, 1);

    setBoards(
      boards.map((b) => {
        if (b.id === board.id) {
          return board;
        }
        if (b.id === currentBoard.id) {
          return currentBoard;
        }
        return b;
      })
    );
  }

  function addHandler(e, board) {
    if (!card.trim()) return;
    const newCard = { id: Date.now(), title: card };
    board.items.push(newCard);
    setBoards(
      boards.map((b) => {
        if (b.id === board.id) {
          return board;
        }
        if (b.id === currentBoard?.id) {
          return currentBoard;
        }
        return b;
      })
    );
    setCard('');
  }

  function deleteHandler(e, board, item) {
    const deleteIndex = board.items.indexOf(item);
    board.items.splice(deleteIndex, 1);

    setBoards(
      boards.map((b) => {
        if (b.id === board.id) {
          return board;
        }
        if (b.id === currentBoard?.id) {
          return currentBoard;
        }
        return b;
      })
    );
  }

  const addToRefs = (el) => {
    if (el && !inputRefs.current.includes(el)) {
      inputRefs.current.push(el);
    }
  };

  return (
    <div className="gap-1 flex p-2 min-w-[800px] h-[93%]">
      {boards.map((board) => (
        <Board
          key={board.id}
          board={board}
          dragOverHandler={dragOverHandler}
          dropCardHandler={dropCardHandler}
          inputRefs={inputRefs}
          setCard={setCard}
          addToRefs={addToRefs}
          card={card}
          addHandler={addHandler}
          dragStartHandler={dragStartHandler}
          dropHandler={dropHandler}
          deleteHandler={deleteHandler}
          dragEndHandler={dragEndHandler}
        />
      ))}
    </div>
  );
};

export default Boards;
