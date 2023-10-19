import {defineStore} from 'pinia'
import requestService from "../utils/request.js";
import Vue from 'vue'
import {getFromStorage} from "../utils/localStorageHelperFunction";
import router from '../router/index'

const ROOMS = "rooms-state";
const SELECTED_ROOM = "selected-room";

export const useRoomsStore = defineStore({
    id: 'rooms',
    state: () => ({
        roomsList: getFromStorage(ROOMS)
            ? getFromStorage(ROOMS)
            : [],
        baseDateInputFormat: 'MM/DD/YYYY',
        baseTimeInputFormat: 'hh:mm',
        baseTimeOutputFormat: 'hh:mm A',
        roomInfo: null,
        consentForms: [],
        showTabs: false,
        selectedForms: [],
    }),
    getters: {
        activeRoomsList: (state) => state.roomsList,
        formsSignButtonStatus: (state) => {
            return state.consentForms.some((form) => form.is_checked === true)
        },
        patientInitials: state => {
            if (state.roomInfo) {
                return state.roomInfo.appointment.first_name.charAt(0) + state.roomInfo.appointment.last_name.charAt(0)
            }
        },
    },
    actions: {
        async getRoomsList() {
            try {
                const response = await requestService.get("/rooms.json");
                this.roomsList = response.data;
                localStorage.setItem(ROOMS, JSON.stringify(this.roomsList));

            } catch (error) {
                console.error(error);
            }
        },
        getRoomInfo(code) {
            const roomInfo = this.roomsList.find((room) => room.code === code);
            if (roomInfo) {
                this.roomInfo = roomInfo;
            } else {
                router.push({ name: "home" });
            }
        },
        async getConsentForms() {
            try {
                const response = await requestService.get("/consent-forms.json");
                this.consentForms = response.data.map((form) => {
                    return {
                        ...form,
                        is_checked: false,
                    }
                });

            } catch (error) {
                console.error(error);
            }
        },
        selectDeselectAllForms(value) {
            this.consentForms.map(form => form.is_checked = value);
        },
        showFormTabs() {
            this.showTabs = true;
            this.selectedForms = this.consentForms.filter((form) => !!form.is_checked);
        },
        clearFormsDetails() {
            this.roomInfo = null;
            this.showTabs = false;
            this.selectedForms = [];
            this.consentForms.map(form => form.is_checked = false);
        },
        async getTabData(formName) {
            const activeForm = this.selectedForms.find((form) => form.short_title === formName)
            if (!activeForm.form_content) {
                try {
                    let form_title = formName.toLowerCase().replaceAll(' ', '_');
                    const response = await requestService.get(`consent-form-details/${form_title}.json`);
                    Vue.set(activeForm, 'form_content', response.data)
                    activeForm.form_content.map((formContent) => {
                        if (formContent.need_initials) {
                            Vue.set(formContent, 'is_checked', false)
                        }
                    })
                } catch (error) {
                    console.error(error);
                }
            }
        },
    }
})
