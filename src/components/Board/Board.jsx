import React from "react";
import { useTranslation } from "react-i18next";
import AddIcon from "@mui/icons-material/Add";

const Board = ({
  board,
  dragOverHandler,
  dropCardHandler,
  inputRefs,
  setCard,
  addToRefs,
  card,
  addHandler,
  dragStartHandler,
  dropHandler,
  deleteHandler,
  dragEndHandler,
}) => {
  const { t } = useTranslation();
  console.log(`render ${board.id}`);
  return (
    <div
      className={
        "board border-[5px] border-solid border-[#23272A] w-[25%] text-sm overflow-auto rounded-lg"
      }
      onDragEnd={(e) => dragEndHandler(e)}
      onDragOver={(e) => dragOverHandler(e)}
      onDrop={(e) => dropCardHandler(e, board)}
    >
      <div className="text-xl text-center p-2 flex items-center justify-between select-none ">
        <p className="inline-block">{t(board.title)}</p>
        <label
          htmlFor={board.id}
          className="btn modal-button w-[15px] h-[20px]"
        >
          <AddIcon fontSize="small" style={{ color: "white" }} />
        </label>
      </div>
      <input
        type="checkbox"
        id={board.id}
        onChange={(e) => inputRefs.current[board.id - 1].focus()}
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor={board.id}
            className="btn btn-sm btn-circle absolute right-2 top-2"
            onClick={(e) => setCard("")}
          >
            ✕
          </label>
          <h3 className="text-lg font-bold text-center p-5 mb-7">
            {t("Add new task")}
          </h3>
          <div className="flex flex-row">
            <input
              ref={addToRefs}
              autoFocus
              type="text"
              placeholder={t("Describe task...")}
              className="input input-bordered input-primary w-full"
              value={card}
              onChange={(e) => setCard(e.target.value)}
            />
            <button
              className="btn btn-active btn-primary ml-5"
              onClick={(e) => addHandler(e, board)}
            >
              {t("Add")}
            </button>
          </div>
        </div>
      </div>

      {board.items.map((item) => (
        <div
          key={item.id}
          className="flex break-all"
          onDragOver={(e) => dragOverHandler(e)}
          onDragStart={(e) => dragStartHandler(e, board, item)}
          onDrop={(e) => dropHandler(e, board, item)}
          onDragEnd={(e) => dragEndHandler(e)}
          draggable={true}
        >
          <label
            htmlFor={item.id}
            className="text-sm mx-2 my-1 border-[2px] border-base-content p-2 w-[100%] cursor-pointer"
          >
            <span>{item.title}</span>
          </label>

          <input type="checkbox" id={item.id} className="modal-toggle" />
          <div
            className="modal select-none"
            onDragStart={(e) => e.preventDefault()}
            draggable={true}
          >
            <div className="modal-box">
              <h3 className="font-bold text-lg">{t("Delete?")}</h3>
              <div className="modal-action">
                <label htmlFor={item.id} className="btn">
                  {t("No")}
                </label>
                <label
                  htmlFor={item.id}
                  className="btn"
                  onClick={(e) => deleteHandler(e, board, item)}
                >
                  {t("Yes")}
                </label>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Board;
