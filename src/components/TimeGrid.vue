<script>
import { defineComponent } from 'vue'
import { Calendar } from '@fullcalendar/core'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { INITIAL_EVENTS, createEventId } from '../utils/event-utils'
import zh from '@fullcalendar/core/locales/zh-cn'
import { ref } from "vue"
import { Dialog } from '@varlet/ui'
import { Snackbar } from '@varlet/ui'
import { useGlobalStore ,useBookStore} from '@/store';

const global=useGlobalStore()
const book=useBookStore()
const {studentID,URL} = global
const url = `${URL}/save`

export default defineComponent({
  components: {
    FullCalendar,
  },

  data() {

    return {
      show:false,
      title:'',
      calendarOptions: {
        plugins: [
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin // needed for dateClick
        ],
        themeSystem:'bootstrap',
        height:800,
        handleWindowResize: true,
        locale:zh,
        customButtons: {
            myCustomButton: {
            text: 'custom!',
            }
         },
        headerToolbar: {
          left: 'prev,next',
          center: 'title',
          right: 'today',
          
        },
        scrollTime:"12:00:00",//设置默认滚动到的时间点
        views: {
                timeGridDay: { // name of view
                    titleFormat: { day: '2-digit', month: '2-digit' },
                                 // other view-specific options here
                    allDaySlot:false
                            },
                            
               },
        initialView: 'timeGridDay',
        stickyHeaderDates:true,
        initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
        editable: false,
        selectable: true,
        selectMirror: false,
        dayMaxEvents: true,
        weekends: true,
        select: this.handleDateSelect,
        eventsSet: this.handleEvents,
        dateClick: this.handleDateClick
        /* you can update a remote database when these fire:
        eventAdd:
        eventChange:
        eventRemove:
        */
      },
      currentEvents: [{
      start: '2024-03-17T13:00:00',
      end: '2024-03-17T16:00:00',
      display: 'background'
    }],
    }
  },
  methods: {
    async postData(url,selectInfo){
      const regex = /(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2}:\d{2})/;
      let start=selectInfo.startStr.match(regex).slice(1,3).join(' ');
      let end=selectInfo.endStr.match(regex).slice(1,3).join(' ');
      let bookRoom=book.bookMeetingRoom;
      
     await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // 设置请求头为 JSON
            // 其他请求头，如果有的话
        },
        body: JSON.stringify({ 
        "endTime": end,
        "id": 1,
        "locationId": bookRoom.locationId,
        "organizerId": studentID,
        "resComment": "我是一个测试预约内容",
        "startTime": start,
        "status": 0,
        "title": this.title
        }), // 将数据转换为 JSON 字符串并作为请求体发送
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // 解析响应体为 JSON
      })  
      .catch(error => {
          console.error('There was an error!', error);
      });



    },
      
    async handleDateSelect(selectInfo) {
      this.show=true;
      this.title=prompt("请输入会议标题");
      await this.postData(url,selectInfo);
      let calendarApi = selectInfo.view.calendar;
      calendarApi.unselect() // clear date selection
      if (title) {
        calendarApi.addEvent({
          id: createEventId(),
          title:this.title,
          start: selectInfo.startStr,
          end: selectInfo.endStr,
          allDay: selectInfo.allDay
        })
      }
    },
    handleEventClick(clickInfo) {
      confirm(`该时间段已被占用`)
    },
    handleEvents(events) {
      this.currentEvents = events
    },

    onBeforeClose(action, done) {
      Snackbar({position:'bottom',content:'正在请求'})
      
       setTimeout(() => {
        this.actions[action]()
        done()
   },   1000)
}
  }
})

</script>

<template>
  <div class='demo-app'>
    
    <div class='demo-app-main'>
    
      <FullCalendar
        class='demo-app-calendar'
        :options='calendarOptions'
      >
 
      </FullCalendar>
    </div>
  </div>
</template>

<style lang='css'>
.fc .fc-button{
    border: 0 !important;
    border-radius:0 !important;
    background-color: var(--color-primary);
}
.fc .fc-button-primary:disabled{
    background-color: var(--color-primary);
}

.fc .fc-toolbar{
    background-color: var(--color-primary);
    color: #fff;
    margin-top: -1px;
}
.fc .fc-toolbar.fc-header-toolbar {
    margin-bottom: 0;
}

</style>
