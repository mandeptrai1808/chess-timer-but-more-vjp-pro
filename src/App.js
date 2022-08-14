import "./App.css";
import { useState, useEffect } from "react";
import Timer from "./Components/Timer";
import { Button, Modal, Form, Input, Radio } from "antd";
import SettingsIcon from '@mui/icons-material/Settings';
import AppsIcon from '@mui/icons-material/Apps';
import ViewWeekIcon from "@mui/icons-material/ViewWeek";
function App() {
  let timeInit = localStorage.getItem("initTime");
  timeInit = timeInit && JSON.parse(timeInit);

  let numPlayer = localStorage.getItem("numberPlayer");
  numPlayer = numPlayer && JSON.parse(numPlayer);

  if (!timeInit) timeInit = 3000;
  if (!numPlayer) numPlayer = 6;
  const [player, setPlayer] = useState([
    {
      time: 3000,
      isLose: false,
    },
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [viewMode, setViewMode] = useState(1)

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const [isPlay, setIsPlay] = useState(false);

  const [indexPlaying, setIndexPlaying] = useState(0);

  var timmer;

  const gridClassMode1 = [
    "md:grid-cols-0",
    "md:grid-cols-1",
    "md:grid-cols-2",
    "md:grid-cols-3",
    "md:grid-cols-4",
    "md:grid-cols-5",
    "md:grid-cols-6",
    "md:grid-cols-7",
    "md:grid-cols-8",
    "md:grid-cols-9",
    "md:grid-cols-10",
  ];

  const gridClassMode2 = [
    "md:grid-cols-0",
    "md:grid-cols-1",
    "md:grid-cols-2",
    "md:grid-cols-3",
    "md:grid-cols-2",
    "md:grid-cols-5",
    "md:grid-cols-3",
    "md:grid-cols-7",
    "md:grid-cols-4",
    "md:grid-cols-3",
    "md:grid-cols-5",
  ];

  const playerInit = () => {
    var tempPlayer = [];
    for (let i = 1; i <= numPlayer; i++) {
      tempPlayer.push({ time: timeInit, isLose: false });
    }
    setPlayer(tempPlayer);
  };

  const checkWinner = () => {
    var temp = 0;
    player.map((item) => {
      if (item.time != 0) temp++;
    });
    if (temp == 1) return true;
    else return false;
  };

  const endTimeOfPlayerByIndex = (id) => {
    clearTimeout(timmer);
    setPlayer(
      player.map((item, index) => {
        if (index === indexPlaying)
          return {
            time: 0,
            isLose: false,
          };
        else return item;
      })
    );
  };

  const contentTimmer = () => {
    return player.map((item, index) => {
      return (
        <Timer
          player={item}
          index={index}
          indexPlaying={indexPlaying}
          numPlayers={player.length + 1}
          playing={isPlay}
          endTime={() => {
            endTimeOfPlayerByIndex();
          }}
        />
      );
    });
  };

  useEffect(() => {
    if (isPlay) {
      if (player[indexPlaying].time == 0) {
        if (checkWinner()) setIsPlay(false);
        else {
          if (indexPlaying + 1 == player.length) setIndexPlaying(0);
          else setIndexPlaying(indexPlaying + 1);
        }
      } else {
        timmer = setTimeout(() => {
          setPlayer(
            player.map((item, index) => {
              if (index == indexPlaying)
                return {
                  time: item.time - 1,
                  isLose: false,
                };
              else return item;
            })
          );
        }, 10);
      }
    }
  }, [isPlay, player, indexPlaying]);


  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      time: timeInit/100,
      numPlayer: numPlayer
    })
    playerInit();
  }, []);


  return (
    <div className="App">
      {/* <ViewWeekIcon/> */}
      <Modal
        title="Setting time"
        visible={isModalVisible}
        footer={false}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          name="basic"
          // labelCol={{ span: 8 }}
          // wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={(value) => {
            if (Number.isInteger(parseInt(value.time))) {
              localStorage.setItem(
                "initTime",
                JSON.stringify(parseInt(value.time) * 100)
              );
              localStorage.setItem(
                "numberPlayer",
                JSON.stringify(parseInt(value.numPlayer))
              );
            } else alert("This is not a number!");
            window.location.reload(false);
          }}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Number of groups (1-10)"
            name="numPlayer"
            rules={[
              { required: true, message: "Please input number of groups!" },
            ]}
          >
            <Input type={"number"} min={1} max={10} />
          </Form.Item>
          <Form.Item
            label="Time (Second)"
            name="time"
            rules={[{ required: true, message: "Please input time!" }]}
          >
            <Input type={"number"} />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Save and reset
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <div className="fixed z-20 bottom-10 left-5 md:block hidden">
        <p className="text-xl mb-2 pb-2 font-bold border-b ">View mode</p>
        <Radio.Group  onChange={(e) => {
          console.log(e.target.value)
          setViewMode(e.target.value)
        }} value={viewMode}>
      <Radio value={1} className="font-bold">Cột <ViewWeekIcon/></Radio>
      <Radio value={2} className="font-bold">Lưới <AppsIcon/></Radio>
    </Radio.Group>
      </div>

      <div className="fixed bottom-5 md:right-5 z-20 md:text-right right-none px-5">
        <button
          onClick={() => {
            setIsModalVisible(true);
          }}
          className=" bg-slate-800 hover:bg-opacity-50 bg-opacity-80 rounded-md text-xl px-5 py-2 text-white"
        >
          Setting
        </button>
        <p className="text-slate-800">Copyright by ECCIT</p>
      </div>

      <div className={`grid ${(viewMode==1) ? gridClassMode1[player.length]:gridClassMode2[player.length]} h-screen`}>
        {contentTimmer()}
      </div>

      <div className="fixed bottom-5 md:right-0 right-5 md:w-full flex md:justify-center">
        <div className="w-fit h-fit relative z-30 bg-white bg-opacity-60 md:p-5 py-5 flex md:flex-row flex-col items-center rounded-full shadow-lg">
          <button
            onClick={() => {
              // playerInit();
              window.location.reload(false);
              setIsPlay(false);
            }}
            className="md:w-20 md:h-20 w-12 h-12 rounded-full border bg-slate-300  font-bold hover:bg-red-200"
          >
            Reset
          </button>
          {isPlay ? (
            <button
              className="md:w-32 md:h-32 w-16 h-16  md:mx-5 md:my-0 mx-2 my-5 rounded-full text-xl bg-red-500 text-white font-bold hover:bg-red-300 shadow-md border"
              onClick={() => {
                clearTimeout(timmer);
                if (indexPlaying + 1 == player.length) setIndexPlaying(0);
                else setIndexPlaying(indexPlaying + 1);
              }}
            >
              Next
            </button>
          ) : (
            <button
              className="md:w-32 md:h-32 w-16 h-16  md:mx-5 md:my-0 mx-2 my-5 rounded-full text-xl bg-red-500 text-white font-bold hover:bg-red-300 shadow-md border"
              onClick={() => {
                setIsPlay(true);
              }}
            >
              Start
            </button>
          )}
          <button
            className="md:w-20 md:h-20 w-12 h-12 rounded-full border bg-slate-300  font-bold hover:bg-red-200"
            onClick={() => {
              setIsPlay(false);
              console.log(player);
            }}
          >
            Stop
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
