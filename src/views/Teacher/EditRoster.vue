<template>
    <div id="edit-roster">
        <NavSide />
        <div class="teacher-wrapper">
            <h1 class="teacher-title">Edit Roster</h1>
            <div id="roster">
                <h3 class="table-title">Roster - {{className}} ({{classDays}}) {{classStart}} - {{classEnd}}</h3>
                <b-table striped fixed hover :items="roster" :fields="fields">
                    <template slot="last_name" slot-scope="data">
                        {{ data.item.last_name }}
                        <b-link style="float: right;" v-on:click="removeStudent(data.item.last_name)">Remove</b-link>
                    </template>
                </b-table>
                <b-link v-if="!hideAdd" v-on:click="switchAdd">+ Add Student...</b-link>
                <b-form v-if="!hideNew" id="add-student-fields" @submit="onSubmit">
                    <b-form-group id="new-student-first" class="student-field">
                        <b-form-input class="student-field" placeholder="First Name"></b-form-input>
                    </b-form-group>
                    <b-form-group id="new-student-last" class="student-field">
                        <b-form-input class="student-field" placeholder="Last Name"></b-form-input>
                    </b-form-group>
                    <b-form-group id="new-student-btns">
                        <b-button v-on:click="switchNew" variant="outline-secondary">Cancel</b-button>
                        <b-button id="submit-student" v-on:click="switchNew" variant="primary" type="submit">Add Student</b-button>
                    </b-form-group>
                </b-form>
            </div>
        </div>
    </div>
</template>

<script>
import bootbox from "bootbox";
import NavSide from "../../components/NavSide";
import Roster from "../../assets/roster1.json";
export default {
    name: "EditRoster",
    components: {
        NavSide
    },
    data() {
        return {
            roster: [],
            fields: ['first_name', 'last_name'],
            className: "Math",
            classDays: "MWF",
            classStart: "9:00",
            classEnd: "10:00",
            hideNew: true,
            hideAdd: false
        }
    },
    methods: {
        switchAdd() {
            this.hideAdd = true;
            this.hideNew = false;
        },
        switchNew() {
            this.hideAdd = false;
            this.hideNew = true;
        },
        removeStudent(name) {
            console.log(this.roster);
            var ros = this.roster;
            bootbox.confirm("Remove student?", function(result) {
                if(result) {
                    ros = ros.filter(r => r.last_name != name);
                    this.roster = ros;
                    console.log(this.roster);
                }
            })
        },
        onSubmit() {
            console.log("Submitted");
        }
    },
    mounted:function() {
        this.roster = Roster.filter(r => r.className == "Math");
    }
}
</script>

<style>
#roster {
    width: 50%;
}

.student-field {
    width: 45%;
    display: inline-block;
}

#new-student-last {
    margin-left: 20px;
}

#new-student-btns {
    float: right;
}

#submit-student {
    margin-left: 20px;
}
</style>
