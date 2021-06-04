import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import secureAxios from "api/core/apiClient";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import { IPatient } from "pages/PatientRecords/IPatientRecords";
import { DatePicker, message } from "antd";
import "antd/dist/antd.css";

const SMSTileContainer = styled.div`
  display: flex;
  border-radius: 16px;
  justify-content: space-between;
  margin: auto;
  flex-direction: column;
  background: #ffffff;
  height: 100%;
  width: 90%;
  margin-left: -3px;
`;

const PhoneNumber = styled.p`
  font-family: Avenir;
  font-style: normal;
  font-weight: 800;
  font-size: 18px;
  line-height: 25px;
  color: #404040;
  padding-top: 23px;
  padding-bottom: 15px;
  text-align: center;
`;

const BoxTop = styled.div`
  width: 100%;
  height: 70px;
  left: 817px;
  top: 48px;
  background: #dde1e7;
  border-radius: 16px 16px 0px 0px;
`;

const TextTable = styled.table`
  background: #ffffff;
  width: 100%;
  height: 80%;
  overflow-y: scroll;
`;

const TextBubblePatient = styled.div`
  background: #d3d3d3;
  border-radius: 0px 15px 15px 15px;
  float: left;
  color: #404040;
`;

const TextBubblePatientGlucose = styled.div`
  background: #bfb5ff;
  border-radius: 0px 15px 15px 15px;
  float: left;
  color: #404040;
`;

const TextBubbleBot = styled.div`
  background: #a6cee3;
  border-radius: 15px 0px 15px 15px;
  float: right;
  color: #404040;
`;

const TextBubbleCoach = styled.div`
  background: #637792;
  border-radius: 15px 0px 15px 15px;
  float: right;
  color: white;
`;

const TextBubbleRow = styled.div`
  max-height: 5px;
  margin-top: 10px;
`;

const TextBubbleText = styled.div`
  font-family: Avenir;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 22px;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 16px;
  padding-right: 16px;
  white-space: pre-wrap;
`;

const SendButton = styled.button`
  background-color: white;
  font-size: 15px !important;
  border-radius: 15px !important;
  color: #f29da4 !important;
  border: none !important;
  font-weight: 600;
  padding: 6px;
  margin-left: 10px;

  &:hover {
    box-shadow: 5px 5px 10px rgba(221, 225, 231, 1) !important;
    border: none !important;
    cursor: pointer;
  }

  &:focus {
    box-shadow: 5px 5px 10px rgba(221, 225, 231, 1) !important;
    border: none !important;
  }
`;

const TextContainer = styled.div`
  padding: 20px;
  overflow-y: scroll;
  max-height: 1150px;
`;

const SendBarContainer = styled.div``;

const SendInputContainer = styled.div``;

const SendButtonContainer = styled.div``;

const SendInput = styled.textarea`
  background-color: #dde1e7;
  border-radius: 12px;
  padding: 8px 20px 8px 32px;
  border: none;
  width: 95%;
  box-shadow: 5px 5px 10px 0px rgba(221, 225, 231, 0.5);

  &:focus {
    outline: none;
    box-shadow: inset 0px 0px 4px 0px rgb(99, 119, 146);
  }
`;

enum Texter {
  PATIENT,
  BOT,
  COACH,
}

interface SMSProps {
  messages: any[];
  patient: IPatient;
}

interface TextProps {
  message: string;
  type: Texter;
  receivedWith: string;
}

const TextBubble: React.FC<TextProps> = ({
  message,
  type,
  receivedWith,
}: TextProps) => {
  if (type == Texter.PATIENT) {
    if (receivedWith === "Glucose") {
      return (
        <TextBubblePatientGlucose>
          <TextBubbleText> {message} </TextBubbleText>
        </TextBubblePatientGlucose>
      );
    }
    return (
      <TextBubblePatient>
        <TextBubbleText> {message} </TextBubbleText>
      </TextBubblePatient>
    );
  } else if (type == Texter.BOT) {
    return (
      <TextBubbleBot>
        <TextBubbleText> {message} </TextBubbleText>
      </TextBubbleBot>
    );
  } else {
    return (
      <TextBubbleCoach>
        <TextBubbleText> {message} </TextBubbleText>
      </TextBubbleCoach>
    );
  }
};

const SMSTile: React.FC<SMSProps> = ({
  messages: messagesProp,
  patient,
}: SMSProps) => {
  const [newMsg, setNewMsg] = useState<string>("");
  const [messages, setMessages] = useState([...messagesProp]);
  const [showDate, setShowDate] = useState(false);
  const [scheduleDate, setScheduleDate] = useState<any>();

  // scrolls text to bottom
  const textScrollRef = useRef(null);
  const ref = useRef<HTMLDivElement>(null);
  const [showEmoji, setEmoji] = useState(false);

  const showEmojis = () => {
    setEmoji(true);
    document.addEventListener("click", closeEmojiMenu);
  };

  const closeEmojiMenu = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      setEmoji(false);
      document.removeEventListener("click", closeEmojiMenu);
    }
  };

  const textChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewMsg(e.target.value);
  };

  const addEmoji = (e: any) => {
    let emoji = e.native;
    setNewMsg(newMsg + emoji);
  };

  useEffect(() => {
    if (textScrollRef.current) {
      (textScrollRef.current! as any).scrollTop = (textScrollRef.current! as any).scrollHeight;
    }
  }, [textScrollRef.current, messages]);

  const toggleShowDate = () => {
    setShowDate(!showDate);
    setScheduleDate("");
  };

  const onSend = () => {
    const data = {
      to: patient.phoneNumber,
      message: newMsg,
      patientID: patient._id,
      scheduled: scheduleDate?._d || ""
    };
    secureAxios
      .post("/api/twilio/sendMessage", data)
      .then((res) => {
        setMessages([...messages, res.data.msg]);
        setNewMsg("");
      })
      .catch((err) => {
        alert(err);
      });
  };

  const handleChange = (value: any) => {
    message.info(
      `Selected Date: ${value ? value.format("YYYY-MM-DD HH:mm") : "None"}`
    );
    setScheduleDate(value);
  };

  return (
    <SMSTileContainer>
      <BoxTop>
        <PhoneNumber>
          {patient.phoneNumber.slice(0, 3)}-{patient.phoneNumber.slice(3, 6)}-
          {patient.phoneNumber.slice(6, 10)}
        </PhoneNumber>
      </BoxTop>
      <TextContainer ref={textScrollRef}>
        <TextTable>
          {messages.map((message, index) => (
            <tr key={index}>
              <TextBubbleRow>
                <TextBubble
                  message={message.message}
                  type={message.type}
                  receivedWith={message?.receivedWith || ""}
                ></TextBubble>
              </TextBubbleRow>
            </tr>
          ))}
        </TextTable>
      </TextContainer>

      <SendBarContainer ref={ref}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div
            className="field has-addons"
            style={{ padding: "20px", height: "75px" }}
          >
            <div className="control" style={{ marginLeft: '-20px', paddingRight: '5px' }}>
              <SendButton type="button" onClick={toggleShowDate}>
                <i className="far fa-calendar" aria-hidden="true"></i>
              </SendButton>
            </div>
            <div className="control" style={{ width: "100%", display: "flex" }}>
              <SendInput
                name="query"
                placeholder="Enter your response..."
                onChange={textChange}
                value={newMsg}
              />

              {!showEmoji && (
                <a
                  onClick={showEmojis}
                  style={{ alignSelf: "center", marginLeft: "9px" }}
                >
                  {String.fromCodePoint(0x1f60a)}
                </a>
              )}
            </div>

            <div className="control" style={{ alignSelf: "center" }}>
              <SendButton type="submit" onClick={onSend}>
                <i className="far fa-paper-plane" aria-hidden="true"></i>
              </SendButton>
            </div>
            {showEmoji && (
              <div style={{ position: "absolute", top: "75%" }}>
                <Picker onSelect={addEmoji} title="Emoji Selector" />
              </div>
            )}
            {showDate && (
              <div
                style={{ position: "absolute", marginLeft:'-15px', marginTop:'-40px'}}
              >
                <DatePicker onChange={handleChange} showTime/>
              </div>
            )}
          </div>
        </form>
      </SendBarContainer>
    </SMSTileContainer>
  );
};

export { SMSTile, Texter };
