<template>
  <div v-if="roomInfo" class="room-info-wrapper">
    <p class="room-info-number">Room {{ roomInfo.code }}</p>
    <p><span>Appointment date:</span> {{ appointmentInfo.start_date }}</p>
    <p><span>Vital signs:</span> {{ vitalSigns }}</p>
    <p class="room-info-patient" v-if="appointmentInfo.is_doctor">
      Dr. {{ personalInfo }}
    </p>
    <p class="room-info-patient" v-else>
      {{ appointmentInfo.gender === 'Male' ? 'Mr.' : 'Ms.' }} {{ personalInfo }}
    </p>
  </div>
</template>

<script>
import {mapActions, mapState} from "pinia/dist/pinia";
import {useRoomsStore} from "../../stores/rooms";
import moment from "moment";

export default {
  name: "RoomPatientInfo",
  computed: {
    ...mapState(useRoomsStore, ["roomInfo", "baseDateInputFormat"]),

    appointmentInfo() {
      return this.roomInfo.appointment;
    },
    vitalSigns() {
      return 'HT: ' +
          this.appointmentInfo.vital_signs.height_ft +
          "'" +
          this.appointmentInfo.vital_signs.height_in +
          '", WT: ' +
          this.appointmentInfo.vital_signs.weight +
          'lbs., BMI: ' +
          this.appointmentInfo.vital_signs.bmi
    },
    personalInfo() {
      return this.appointmentInfo.first_name +
          ' ' +
          this.appointmentInfo.last_name +
          ', ' +
          this.fullYears +
          this.appointmentInfo.gender.charAt(0)
    },
    fullYears() {
      if (this.appointmentInfo.birthday) {
        const birthDate = moment(this.appointmentInfo.birthday, this.baseDateInputFormat);
        return moment.duration(new Date() - birthDate).years() + ' years, ';
      } else {
        return 'birthdate not stated, '
      }
    }
  },
  methods: {
    ...mapActions(useRoomsStore, ["getRoomInfo"]),
  },
  mounted() {
    this.getRoomInfo(this.$route.params.code);
  },
}
</script>

<style lang="scss" scoped>
.room-info-wrapper {
  padding: 10px 0;
  border-radius: 5px;
  margin: 0 0 30px;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);

  .room-info-number {
    text-align: center;
    border-bottom: 1px solid $main-border-color;
    padding-bottom: 10px;
    font-size: 14px;
    font-weight: 700;
  }

  .room-info-patient {
    font-weight: 600;
    text-align: center;
  }

  p {
    font-size: 14px;
    padding: 0 10px;
    span {
      font-weight: 600;
    }
  }
}
</style>