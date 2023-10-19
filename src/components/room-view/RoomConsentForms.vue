<template>
  <div v-if="consentForms && !showTabs" class="forms-wrapper">
    <div class="forms-select-all">
      <p>
        <BCheckbox
            v-model="allFormsSelector"
            @change="changeFormsSelection"
        >
          {{allFormsSelector ? 'Deselect all forms' : 'Select all forms'}}
        </BCheckbox>
      </p>
    </div>
    <ul class="forms-list">
      <li
          v-for="form in consentForms"
      >
        <BCheckbox
            v-model="form.is_checked"
            @change="checkFormsSelection($event)"
        ></BCheckbox>
        {{ form.title }}
      </li>
    </ul>
    <div v-if="formsSignButtonStatus" class="forms-button-wrapper">
      <b-button @click="showFormsButtonClicked">Sign</b-button>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from "pinia/dist/pinia";
import {useRoomsStore} from "../../stores/rooms";

export default {
  name: "RoomConsentForms",
  data() {
    return {
      allFormsSelector: false,
    }
  },
  computed: {
    ...mapState(useRoomsStore, ["consentForms","formsSignButtonStatus","showTabs"]),
  },
  methods: {
    ...mapActions(useRoomsStore, ["getConsentForms","selectDeselectAllForms","showFormTabs"]),
    changeFormsSelection() {
      this.selectDeselectAllForms(this.allFormsSelector);
    },
    checkFormsSelection(event) {
      const formsResult = this.consentForms.every((form) => form.is_checked === event);
      if (formsResult) {
        this.allFormsSelector = event;
      } else {
        this.allFormsSelector = false;
      }
    },
    showFormsButtonClicked() {
      this.showFormTabs()
    }
  },
  mounted() {
    this.getConsentForms();
  },
}
</script>

<style lang="scss">
.forms-wrapper {
  .forms-select-all {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-end;
    margin-bottom: 10px;
    .custom-control {
      display: flex;
      align-items: center;
      font-size: 14px;
      font-weight: 600;
      margin: 0;
      label {
        line-height: 1.8;
      }
    }
  }
  .forms-list {
    list-style: none;
    margin: 0;
    padding: 0 10px;

    li {
      display: flex;
      padding-bottom: 20px;

    }
  }
  .forms-button-wrapper {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    justify-content: flex-end;
    .btn {
      min-width: 100px;
    }
  }
}
</style>