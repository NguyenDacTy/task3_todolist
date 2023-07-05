import React, { useEffect } from "react";
import MainContentTask from "../../components/MainContentTask";
import { useDispatch, useSelector } from "react-redux";
import {
  actFetchAllTask,
  setNewPage,
} from "../../redux/features/tasks/taskSlice";
import { Pagination, Spin } from "antd";
import { TASK_STATUS } from "../../constants/task.constant";

const NewTask = () => {
  const dispatch = useDispatch();

  const { isLoading, tasks, pagination, searchKey } = useSelector(
    (state) => state.task
  );
  useEffect(() => {
    //truyen pagination vao
    dispatch(
      actFetchAllTask({
        _page: 1,
        _limit: pagination.limitPerPage,
        q: searchKey,
        status: TASK_STATUS.NEW,
      })
    );

    return () => {
      dispatch(setNewPage(1));
    };
  }, []);

  const handleChangePage = (newPage) => {
    console.log(newPage);
    dispatch(setNewPage(newPage));
    dispatch(
      actFetchAllTask({
        _page: newPage,
        _limit: pagination.limitPerPage,
        q: searchKey,
        status: TASK_STATUS.NEW,
      })
    );
  };

  if (isLoading) {
    return <Spin />;
  }

  return (
    <div>
      {tasks.length === 0 ? (
        <div>No Tasks</div>
      ) : (
        <>
          <MainContentTask tasks={tasks} />
          <Pagination
            defaultPageSize={pagination.limitPerPage}
            current={pagination.currentPage}
            total={pagination.total}
            onChange={handleChangePage}
          />
        </>
      )}
    </div>
  );
};

export default NewTask;
