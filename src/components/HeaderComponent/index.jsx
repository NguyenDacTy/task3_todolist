import React from "react";
import "./style.scss";
import { Button, Input } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { useDispatch, useSelector } from "react-redux";
import { actFetchAllTask, setNewPage, setSearchKey } from "../../redux/features/tasks/taskSlice";
import { TASK_STATUS } from "../../constants/task.constant";

const HeaderComponent = () => {
  // xu li header tai headercomponent luon

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const searchKey = useSelector((state) => state.task.searchKey);
  const pagination = useSelector((state) => state.task.pagination);
  const location = useLocation()
  console.log(location);

  const handleRedirectAddTask = () => {
    navigate(ROUTES.ADD_NEW);
  };

  const computedCurrentStatusSearch = (pathName) => {
    switch (pathName){
      case "/all-task": return ""
      case "/new-task": return TASK_STATUS.NEW
      case "/doing-task": return TASK_STATUS.DOING
      case "/done-task": return TASK_STATUS.DONE
      default: return ""
    }
  }

  const handleSearchTask = (event) => {
    event.preventDefault();

    const statusSearch = computedCurrentStatusSearch(location.pathname)

    // muon search full text thi ta su dung search query cua json server
    dispatch(actFetchAllTask({
        _page: 1,
        _limit: pagination.limitPerPage,
        q: searchKey,
        ...(!!statusSearch ? {status: statusSearch} : {})
      }))
    dispatch(setNewPage(1));
  };

  const handleChangeInputSearch = (event) => {
    const value = event.target.value;
    //khi co value thi ta se dispatch update search len store
    dispatch(setSearchKey(value));
  };

  return (
    <div className="header-container">
      <Button onClick={handleRedirectAddTask}>Create A New Task</Button>
      <form
        className="header-container__search-area"
        onClick={handleSearchTask}
      >
        {/*value cua input lay tu searchkey tren store */}
        <Input
          placeholder="Please input search..."
          value={searchKey}
          onChange={handleChangeInputSearch}
        />
        <Button type="submit">Search</Button>
      </form>
    </div>
  );
};

export default HeaderComponent;
