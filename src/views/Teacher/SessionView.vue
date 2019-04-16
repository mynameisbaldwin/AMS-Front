<template>
    <div id="session-view">
        <TeacherTitle v-bind:title="session.class_name + ' - ' + session.date" />
        <div class="table-component">
            <h2 class="table-title">Roster</h2>
            <b-table :items="roster" :fields="fields" :tbody-tr-class="rowClass">
                <template slot="status" slot-scope="data">
                    {{ data.item.status }}
                    <b-form-select
                    id="change-presence-dropdown"
                    v-model="data.item.status"
                    :options="presenceMarks"
                    @change="changeSession"
                    ></b-form-select>
                </template>
            </b-table>
            <b-link to="/teacher/sessions">Back to Sessions</b-link>
            <b-button class="btn-saves" variant="primary" v-on:click="saveChanges">Save Changes</b-button>
            <b-button class="btn-saves" variant="outline-secondary" v-on:click="cancelChanges">Cancel Changes</b-button>
        </div>
    </div>
</template>

<script>
import TeacherTitle from "../../components/TeacherTitle.vue";
import axios from "axios";
import seshs from "../../assets/sessions.json";
import roster from "../../assets/roster1.json";
import bootbox from "bootbox";
export default {
    name: "SessionView",
    components: {
        TeacherTitle
    },
    data() {
        return {
            session: {
                id: this.$route.params.sessionId, //grabs session id from route
                class_name: null,
                date: null
            },
            roster: null,
            rosterBackup: null,
            change: false,
            fields: ['last_name', 'first_name', 'status'],
            presenceMarks: [
                { value: null, text: "Change to..." },
                { value: "Present", text: "Present" },
                { value: "Absent", text: "Absent" },
                { value: "Tardy", text: "Tardy" }
            ]
        }
    },
    methods: {
        rowClass(item) {
            //method responsible for changing row colors
            if (!item) return;
            if (item.status === "Present") return "table-success";
            if (item.status === "Absent") return "table-danger";
            if (item.status === "Tardy") return "table-warning";
        },
        changeSession() {
            this.change = true;
        },
        saveChanges() {
            if(this.change) 
            {
                bootbox.confirm({
                    message: "Are you sure you want to submit changes?",
                    buttons: {
                        confirm: {
                            label: "Yes",
                        },
                        cancel: {
                            label: "No",
                            classname: "btn-outline-secondary"
                        }
                    },
                    callback: function(result) {
                        if(result) 
                        {
                            console.log("Changes saved");
                            this.rosterBackup = [...this.roster];
                        }
                        else {return;}
                    }
                })
            }
        },
        cancelChanges() {
            if(this.change) 
            {
                bootbox.confirm({
                    message: "Are you sure you want to cancel your changes? All progress will be lost.",
                    buttons: {
                        confirm: {
                            label: "Yes",
                        },
                        cancel: {
                            label: "No",
                            classname: "btn-outline-secondary"
                        }
                    },
                    callback: function(result) {
                        if(result) 
                        {
                            console.log("Changes canceled");
                            this.roster = [...this.rosterBackup];
                        }
                        else {return;}
                    }
                })
            }
        }
    },
    mounted:function() {
        let s = seshs.filter(sesh => sesh.id == this.session.id);
        this.session.class_name = s[0].class_name;
        this.session.date = s[0].date;
        this.roster = roster.filter(r => r.sessionID == this.session.id);
        this.rosterBackup = [...this.roster];
    }
}
</script>

<style>
.table-component {
    width: 700px;
}

.btn-saves {
    float: right;
}

#change-presence-dropdown {
  width: 150px;
  float: right;
}
</style>
