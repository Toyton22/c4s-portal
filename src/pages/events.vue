<template>
  <h1 class="mt-5 text-center">{{ pagename }}</h1>

  <div class="mw-xl mx-auto p-3">
    <!-- placeholder -->
    <div v-if="!ready" class="row">
      <div v-for="n in 8" :key="n" class="col-lg-6 p-2">
        <div class="bg-white rounded-3 p-4 shadow-sm h-100" :class="`work_card`">
          <h5><span class="badge bg-secondary"></span></h5>
          <h5 class="mb-0 placeholder w-100"></h5>
          <p class="mb-0 small text-secondary placeholder w-75"></p>
          <hr class="my-1">
          <p class="placeholder w-100 mb-1"></p>
          <p class="placeholder w-100 mb-1"></p>
          <p class="placeholder w-75"></p>
        </div>
      </div>
    </div>
    <!-- cards -->
    <div v-else class="row">
      <!-- addnew -->
      <div class="col-lg-6 p-2" v-if="admin">
        <!-- editor -->
        <div
          class="bg-white rounded-3 p-4 shadow-sm h-100 position-relative d-flex flex-column add_card"
          v-if="editting == '__NEW'">
          <select class="form-select mb-1" id="__NEW_TYPE">
            <option value="" selected>イベントタイプを選んでください</option>
            <option value="assembly">部会</option>
            <option value="course">講座</option>
            <option value="work">制作会</option>
            <option value="event">イベント</option>
            <option value="recreation">レク</option>
          </select>
          <div class="mb-1">
            <input type="text" class="form-control" id="__NEW_TITLE" placeholder="イベント名" value="">
          </div>
          <p class="mb-0 text-end small text-secondary">時刻を空白にすると終日の予定が作れます</p>
          <div class="mb-1 row">
            <div class="w-50 pe-1">
              <input type="date" class="form-control" id="__NEW_TERM_BEGIN_DATE" value="">
            </div>
            <div class="w-50 ps-1">
              <input type="time" class="form-control" id="__NEW_TERM_BEGIN_TIME" value="18:15">
            </div>
          </div>
          <div class="mb-1 row">
            <div class="w-50 pe-1">
              <input type="date" class="form-control" id="__NEW_TERM_END_DATE" value="">
            </div>
            <div class="w-50 ps-1">
              <input type="time" class="form-control" id="__NEW_TERM_END_TIME" value="20:00">
            </div>
          </div>
          <div class="mb-1">
            <input type="text" class="form-control" id="__NEW_PLACE" placeholder="場所" value="">
          </div>
          <div class="mb-1 row">
            <div class="w-50 pe-1">
              <input type="text" class="form-control" id="__NEW_CODE" placeholder="出席コード" value="">
            </div>
            <div class="w-50 ps-1 input-group">
              <input type="number" class="form-control" id="__NEW_POINT" placeholder="ポイント" value="">
              <span class="input-group-text">Pts.</span>
            </div>
          </div>
          <div class="mb-1">
            <textarea class="form-control" id="__NEW_DESCRIPTION" rows="3" value="" placeholder="概要"/>
          </div>
          <div class="row">
            <div class="w-50 pe-1">
              <div
                class="rounded-1 border text-center py-2 text-secondary hover pointer"
                @click="confirm_('閉じてよろしいですか？') ? editting = '' : ''">
                キャンセル
              </div>
            </div>
            <div class="w-50 ps-1">
              <div
                class="rounded-1 bg-secondary text-center py-2 text-light hover pointer"
                @click="confirm_('保存しますか？') ? upload() : ''">
                保存
              </div>
            </div>
          </div>
        </div>
        <!-- btn -->
        <div v-else @click="editting = '__NEW'" class="rounded-3 p-4 shadow-sm hover pointer h-100 add_card d-flex justify-content-center align-items-center">
          <h5 class="mb-0 text-secondary text-center"><i class="bi bi-plus-square-dotted"> </i> 新規登録</h5>
        </div>
      </div>
      <!-- list -->
      <div v-for="(event, id) in Events" :key="id" class="col-lg-6 p-2">
        <!-- display -->
        <div
          class="bg-white rounded-3 p-4 shadow-sm h-100 position-relative d-flex flex-column"
          :class="`${event.type ? event.type : 'assembly'}_card`"
          v-if="editting != id">
          <h5>
            <span class="badge bg-danger" v-if="!event.type || event.type == 'assembly'">部会</span> 
            <span class="badge bg-success" v-else-if="event.type == 'course'">講座</span> 
            <span class="badge bg-secondary" v-else-if="event.type == 'work'">制作会</span> 
            <span class="badge bg-indigo" v-else-if="event.type == 'event'">イベント</span> 
            <span class="badge bg-darkorange" v-else-if="event.type == 'recreation'">レク</span> 
            <span class="badge bg-secondary" v-else>その他</span> 
          </h5>
          <h5 class="mb-0">
            {{ event.title }}
          </h5>
          <p class="mb-0 small text-secondary">{{ getTermText(event.term) }} ・ {{ event.place }}</p>
          <hr class="my-1">
          <p>{{ event.description }}</p>
          <div class="mt-2 d-flex mt-auto" v-if="user">
            <div class="balloon1-right">
              <p>アンケート</p>
            </div>
            <div
              class="Qbtn hover pointer"
              :class="(event.notice && event.notice[user.uid] == 1) ? 'attend' : 'text-secondary'"
              @click="notice(id, true)">
              <i class="bi bi-check-lg"></i> 参加 <span v-if="event.notice">{{ Object.keys(event.notice).filter(n => event.notice[n] == 1).length }}</span>
            </div>
            <div
              class="Qbtn hover pointer"
              :class="event.notice && event.notice[user.uid] == -1 ? 'absent' : 'text-secondary'"
              @click="notice(id, false)">
              <i class="bi bi-x"></i> 欠席
            </div>
          </div>
          <div class="position-absolute top-0 end-0 p-4">
            <h5 class="text-secondary">
              <span class="ms-4 bi bi-person-check" v-if="event.code"></span>
              <span class="ms-4 bi bi-pencil-square pointer" v-if="admin" @click="editting = id"></span>
              <span class="ms-4 bi bi-calendar-x pointer" v-if="admin" @click="del(id)"></span>
            </h5>
          </div>
        </div>
        <!-- editor -->
        <div
          class="bg-white rounded-3 p-4 shadow-sm h-100 position-relative d-flex flex-column"
          :class="`${event.type ? event.type : 'assembly'}_card`"
          v-if="editting == id">
          <select class="form-select mb-1" :id="`${id}_TYPE`" :value="event.type">
            <option value="" selected>イベントタイプを選んでください</option>
            <option value="assembly">部会</option>
            <option value="course">講座</option>
            <option value="work">制作会</option>
            <option value="event">イベント</option>
            <option value="recreation">レク</option>
          </select>
          <div class="mb-1">
            <input type="text" class="form-control" :id="`${id}_TITLE`" placeholder="イベント名" :value="event.title">
          </div>
          <p class="mb-0 text-end small text-secondary">時刻を空白にすると終日の予定が作れます</p>
          <div class="mb-1 row">
            <div class="w-50 pe-1">
              <input type="date" class="form-control" :id="`${id}_TERM_BEGIN_DATE`" :value="event.term.begin.split(' ')[0]">
            </div>
            <div class="w-50 ps-1">
              <input type="time" class="form-control" :id="`${id}_TERM_BEGIN_TIME`" :value="event.term.begin.split(' ')[1]">
            </div>
          </div>
          <div class="mb-1 row">
            <div class="w-50 pe-1">
              <input type="date" class="form-control" :id="`${id}_TERM_END_DATE`" :value="event.term.end.split(' ')[0]">
            </div>
            <div class="w-50 ps-1">
              <input type="time" class="form-control" :id="`${id}_TERM_END_TIME`" :value="event.term.end.split(' ')[1]">
            </div>
          </div>
          <div class="mb-1">
            <input type="text" class="form-control" :id="`${id}_PLACE`" placeholder="場所" :value="event.place">
          </div>
          <div class="mb-1 row">
            <div class="w-50 pe-1">
              <input type="text" class="form-control" :id="`${id}_CODE`" placeholder="出席コード" :value="event.code">
            </div>
            <div class="w-50 ps-1 input-group">
              <input type="number" class="form-control" :id="`${id}_POINT`" placeholder="ポイント" :value="event.point">
              <span class="input-group-text">Pts.</span>
            </div>
          </div>
          <div class="mb-1">
            <textarea class="form-control" :id="`${id}_DESCRIPTION`" rows="3" :value="event.description" placeholder="概要" />
          </div>
          <div class="row">
            <div class="w-50 pe-1">
              <div
                class="rounded-1 border text-center py-2 text-secondary hover pointer"
                @click="confirm_('閉じてよろしいですか？') ? editting = '' : ''">
                キャンセル
              </div>
            </div>
            <div class="w-50 ps-1">
              <div
                class="rounded-1 bg-secondary text-center py-2 text-light hover pointer"
                @click="save(id)">
                保存
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref, get, set, update, remove } from "firebase/database";
import { onAuthStateChanged, getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBE60G8yImWlENWpCnQZzqqVUrwWa_torg",
  authDomain: "c4s-portal.firebaseapp.com",
  databaseURL: "https://c4s-portal-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "c4s-portal",
  storageBucket: "c4s-portal.appspot.com",
  messagingSenderId: "863775995414",
  appId: "1:863775995414:web:82eb9557a13a099dfbe737",
  measurementId: "G-K2SR1WSNRC"
};

const app = initializeApp(firebaseConfig)
const auth = getAuth()
const db = getDatabase(app)

export default {
  name: "EventPage",
  data() {
    return {
      pagename: "イベント情報",
      ready: false,
      user: {},
      c4suser: {},
      admin: true,
      Events: {},
      endEvents: {},
      heldEvents: {},
      editting: '',
      aditting_allday: false
    }
  },
  created() {
    onAuthStateChanged(auth, snapshot => {
      this.user = snapshot
      if (this.user) {
        get(ref(db, `users/${this.user.uid}`)).then(snapshot => this.c4suser = snapshot.val() )
        get(ref(db, `admin-users/${this.user.uid}`)).then(snapshot => this.admin = snapshot ? true : false )
      } else {
        this.c4suser = null
        this.admin = false
      }
    })
    onValue(ref(db, "event"), snapshot => {
      this.Events = {}
      this.heldEvents = {}
      this.endEvents = {}

      // イベントを終了・開催中・予定に振り分け
      // ちゃんと日付順に並び替えてから
      let data = snapshot.val()
      const sortedKeys = Object.keys(data).sort((a, b) => new Date(data[a].term.begin) - new Date(data[b].term.begin))
      sortedKeys.forEach(id => {
        if(new Date() < new Date(data[id].term.begin)) this.Events[id] = data[id]
        else if(new Date() < new Date(data[id].term.end)) this.heldEvents[id] = data[id]
        else this.endEvents[id] = data[id]
      })

      this.ready = true
    })
  },
  methods: {
    getTermText(term) {
      const ALLDAY = term.allday
      const BEGIN = new Date(term.begin)
      const END = new Date(term.end)
      const TODAY = new Date()

      const LIST = (input) => { 
        let date = new Date(input)
        return [ date.getFullYear(), date.getMonth()+1, date.getDate(), date.getHours(), date.getMinutes() ]
      }
      const Shift = (date, int) => { return date.setDate(date.getDate()+int) }
      const addZero = (str) => { return String(str)[1] ? str : '0'+str }
      const compareDate = (one, another) => {
        return (LIST(one)[0] == LIST(another)[0] && LIST(one)[1] == LIST(another)[1] && LIST(one)[2] == LIST(another)[2])
      }

      let MSG = ''
      if (compareDate(TODAY, BEGIN)) { MSG = '（きょう）' }
      if (compareDate(Shift(TODAY, 1), BEGIN)) { MSG = '（きのう）' }
      if (compareDate(Shift(TODAY, 2), BEGIN)) { MSG = '（あさって）' }

      // 開始日時
      let beginString = ''
      if (LIST(BEGIN)[0] != LIST(TODAY)[0]) beginString += `${LIST(BEGIN)[0]}年`
      beginString += `${LIST(BEGIN)[1]}月${LIST(BEGIN)[2]}日`
      if (!ALLDAY) beginString += ` ${LIST(BEGIN)[3]}:${addZero(LIST(BEGIN)[4])}`
      // 終了日時
      let endString = ''
      if (compareDate(BEGIN, END)) { if (!ALLDAY) { endString = ` - ${LIST(END)[3]}:${addZero(LIST(END)[4])}` } }
      else {
        endString = ` - `
        if (LIST(BEGIN)[0] != LIST(END)[0]) endString += `${LIST(END)[0]}年`
        endString += `${LIST(END)[1]}月${LIST(END)[2]}日`
        if (!ALLDAY) beginString += ` ${LIST(END)[3]}:${addZero(LIST(END)[4])}`
      }

      return `${beginString}${MSG}${endString}`
    },
    notice(id, bool) {
      set(ref(db, `event/${id}/notice/${this.user.uid}`), bool ? 1 : -1 )
    },
    confirm_(str) { return confirm(str) },
    upload () {
      const value = (id) => { return document.getElementById(id).value }
      // まずは不備チェック
      if (!value(`__NEW_TITLE`)) { alert('イベント名が入力されていません'); return }
      if (!value(`__NEW_TERM_BEGIN_DATE`) || !value(`__NEW_TERM_END_DATE`)) { alert('日付を入力してください'); return }
      if (!value(`__NEW_PLACE`)) { alert('開催場所の入力は必須です'); return }
      // アップロード
      set(ref(db, `event/${new Date().getTime().toString(16).toUpperCase()}`), {
        type: value(`__NEW_TYPE`),
        title: value(`__NEW_TITLE`),
        term: {
          begin: `${value(`__NEW_TERM_BEGIN_DATE`)} ${value(`__NEW_TERM_BEGIN_TIME`)}`,
          end: `${value(`__NEW_TERM_END_DATE`)} ${value(`__NEW_TERM_END_TIME`)}`,
        },
        place: value(`__NEW_PLACE`),
        code: value(`__NEW_CODE`),
        point: value(`__NEW_POINT`),
        description: value(`__NEW_DESCRIPTION`),
        tags: ["新ポータルから登録"],
        notice: "",
        attenders: ""
      }).then(() => { this.editting = '' })
    },
    save (id) {
      const value = (id) => { return document.getElementById(id).value }
      // まずは不備チェック
      if (!value(`${id}_TITLE`)) { alert('イベント名が入力されていません'); return }
      if (!value(`${id}_TERM_BEGIN_DATE`) || !value(`${id}_TERM_END_DATE`)) { alert('日付を入力してください'); return }
      if (!value(`${id}_PLACE`)) { alert('開催場所の入力は必須です'); return }
      // アップロード
      update(ref(db, `event/${id}`), {
        type: value(`${id}_TYPE`),
        title: value(`${id}_TITLE`),
        term: {
          begin: `${value(`${id}_TERM_BEGIN_DATE`)} ${value(`${id}_TERM_BEGIN_TIME`)}`,
          end: `${value(`${id}_TERM_END_DATE`)} ${value(`${id}_TERM_END_TIME`)}`,
        },
        place: value(`${id}_PLACE`),
        code: value(`${id}_CODE`),
        point: value(`${id}_POINT`),
        description: value(`${id}_DESCRIPTION`)
      }).then(() => { this.editting = '' })
    },
    del (id) {
      if (confirm(`「${this.Events[id].title}」を削除してよろしいですか？`) && confirm(`二度と元には戻せません。ほんとうに削除してよろしいですか？`))
      remove(ref(db, `event/${id}`))
    }
  }
}
</script>

<style>
.badge {
  width: 5em;
}
.assembly_card {
  border-left: crimson solid 10px;
}
.course_card {
  border-left: green solid 10px;
}
.work_card {
  border-left: dimgray solid 10px;
}
.bg-indigo {
  background-color: purple;
}
.event_card {
  border-left: purple solid 10px;
}
.bg-darkorange {
  background-color: darkorange;
}
.recreation_card {
  border-left: darkorange solid 10px;
}
.add_card {
  border: darkgray dashed 3px;
}
.balloon1-right {
  position: relative;
  display: inline-block;
  margin-right: 10px;
  padding: 4px 10px;
  max-width: 100%;
  color: #555;
  font-size: 16px;
  background: rgb(225, 225, 225);
  border-radius: 4px;
}
.balloon1-right:before {
  content: "";
  position: absolute;
  top: 50%;
  left: 100%;
  margin-top: -10px;
  border: 10px solid transparent;
  border-left: 15px solid rgb(225, 225, 225);
}
.balloon1-right p {
  margin: 0;
  padding: 0;
}
.Qbtn {
  margin-left: 20px;
  padding: 4px 2px;
  text-align: center;
  border-bottom: gray dashed 2px;
}
.attend {
  font-weight: bolder;
  color: green;
  border-bottom: green dashed 5px;
}
.absent {
  font-weight: bolder;
  color: darkred;
  border-bottom: darkred dashed 5px;
}
</style>