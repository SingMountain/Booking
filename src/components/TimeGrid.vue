<script>
import { defineComponent } from 'vue'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { INITIAL_EVENTS, createEventId } from '../utils/event-utils'
import zh from '@fullcalendar/core/locales/zh-cn'

export default defineComponent({
  components: {
    FullCalendar,
  },
  data() {
    return {
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
        editable: true,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        weekends: true,
        select: this.handleDateSelect,
        eventClick: this.handleEventClick,
        eventsSet: this.handleEvents,
        
        /* you can update a remote database when these fire:
        eventAdd:
        eventChange:
        eventRemove:
        */
      },
      currentEvents: [],
    }
  },
  methods: {
    handleDateSelect(selectInfo) {
      let title = prompt('Please enter a new title for your event')
      let calendarApi = selectInfo.view.calendar

      calendarApi.unselect() // clear date selection

      if (title) {
        calendarApi.addEvent({
          id: createEventId(),
          title,
          start: selectInfo.startStr,
          end: selectInfo.endStr,
          allDay: selectInfo.allDay
        })
      }
    },
    handleEventClick(clickInfo) {
      if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
        clickInfo.event.remove()
      }
    },
    handleEvents(events) {
      this.currentEvents = events
    },
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
