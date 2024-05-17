import { MdDeleteOutline } from "react-icons/md";
import { PiNotePencil } from "react-icons/pi";
import { FaRegCircleCheck } from "react-icons/fa6";

function Tasks(props) {
  return (
  <section className="tasks">
    {(props.tasks).map((item, index) => {
      return(
        <div className={item.completed ? 'backdrop2 completed' : 'pending backdrop'} key={index}>
          {index === props.editIndex ? (
            <input
              type="text"
              value={props.editTitle}
              onChange={props.handleEditTitleChange}
              onBlur={() => props.handleEditTitleSave(index)}
              autoFocus
            />
          ) : (
            <p className="text">{item.title}</p>
          )}
          <div className="bottom flex">
            <p className="date">{item.date}</p>
            <div className="icons flex">
              <PiNotePencil 
                className="icon edit" 
                title="Edit" 
                onClick={() => props.editTask(index)}
              />
              <MdDeleteOutline 
                className="icon delete" 
                title="Delete"
                onClick={() => props.deleteTask(index)}
              />
              <FaRegCircleCheck 
                className="icon done" 
                title="Completed"
                onClick={() => props.completeTask(index)}
              />
            </div>
          </div>
        </div>
      );
    })}
  </section>
  );
}

export default Tasks;
