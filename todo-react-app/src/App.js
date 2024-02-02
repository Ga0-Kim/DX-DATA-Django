import './App.css';

import React from "react"
import ToDo from "./ToDo"
// import Sample from "./Sample"

import {Paper, List, Container} from "@material-ui/core"
import AddToDo from "./AddToDo"

class App extends React.Component {
  constructor(props) {
    // App.js에서 넘겨준 속성들을 자신의 props에 저장
    // this.props.item이라는 속성에 앞에서 전달한 데이터를 저장
    super(props)
    // this.state.item = {id:0, "title":"Hello React", "done":true}
    // App.js에 this.state.item이라는 이름으로 데이터를 생성
    // ToDo에게 item이라는 이름으로 데이터를 전달
    this.state = {items:[]}
  }

  //화면이 보여질 때 마다 호출되는 수명 주기 함수
  componentDidMount() {
    //ajax 요청 객체 생성
    let request = new XMLHttpRequest() ;
    //요청 준비
    request.open('GET', "http://127.0.0.1/todo/?userid=%EA%B0%80%EC%98%81");
    //요청
    request.send('');
    //응답 처리
    request.addEventListener('load', () => {
      //JSON 데이터 출력
      // console.log(request.responseText)

      //JSON 문자열을 데이터로 변환
      let data = JSON.parse(request.responseText);
      console.log(data)
      //서버에서 받아온  화면에서 출력
      this.setState({items:data.list})
    })
  }

  // 데이터를 추가하는 함수
  add = (item) => {
    // react는 props는 수정할 수 없고
    // state는 수정이 가능하지만 원본을 직접 수정하는 것은 안되고
    // setState 메서드를 이용해서만 수정 가능

    // 배열에 데이터를 추가하기 위해서 state의 배열을 복사
    const thisItems = this.state.items;

    // item의 id와 done 값을 설정 - title만 입력하기 때문
    item.id = "ID_" + thisItems.length;
    item.done = false;

    // 복사한 데이터에 데이터를 추가
    thisItems.push(item)
    // 복사한 데이터를 다시 state에 적용
    this.setState({items:thisItems});
  }

  delete = (item) => {
    //state 나 props의 데이터는 직접 편집이 안됩니다.
    const thisItems = this.state.items;

    //복사본에서 item 제거
    //filter은 리턴 타입이 bolean 함수를 매개변수로 받아서
    //리턴 결과가 true인 데이터만 모아서 배열로 리턴하는 함수입니다.
    //thisItems를 순회를 하면서 e에 id를 하나씩 집어 넣고
    //각각의 id와 item의 id가 같은 거를 비교해서 
    const newItems = thisItems.filter((e)=> e.id !== item.id);

    //원본에 다시 복사
    this.setState({items:newItems})
  }


  render() {
    // 배열을 순회하면서 출력할 내용을 생성
    // item은 배열을 순회할 때 각각의 데이터이고 idx는 인덱스
    // 배열을 순회하면서 출력물을 만들 때는 key를 설정해줘야 함
    // key를 설정하지 않으면 출력에는 문제 없지만 콘솔에 에러 출력됨
    let display = this.state.items.length > 0 && (
      <Paper style = {{margin:16}}>
        <List>
          {this.state.items.map((item, idx) => (
            <ToDo item = {item} key = {idx} delete={this.delete} />
          ))}
        </List>
      </Paper>
    )

    return (
      <div className = "App">
        <Container maxWidth = "md">
          <AddToDo add = {this.add} />
          {display}
        </Container>
      </div>
    )
  }
}

export default App;