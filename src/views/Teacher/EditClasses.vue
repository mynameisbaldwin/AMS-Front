<template>
    <div id="classes">
        <NavSide/>
        <div class="teacher-wrapper">
            <h1 class="teacher-title">Edit Classes</h1>
            <div id="forms">
                <b-form-select v-model="selectedClass" :options="classNames" @change="onChange">
                    <template slot="first">
                        <option :value="null" disabled>Choose a class...</option>
                    </template>
                </b-form-select>
                <b-form id="form-edit" @submit="onSubmit">
                    <b-form-group id="className" label="Class Name" label-for="classNameIn">
                        <b-form-input
                        id="classNameIn"
                        v-model="form.className"
                        placeholder="Class Name"
                        required
                        ></b-form-input>
                    </b-form-group>
                    <b-form-group class="times" id="startTime" label="Start Time" label-for="startTimeIn">
                        <b-form-input
                        id="startTimeIn"
                        v-model="form.startTime"
                        placeholder="Start Time"
                        type="time"
                        required
                        ></b-form-input>
                    </b-form-group>
                     <b-form-group class="times" id="endTime" label="End Time" label-for="endTimeIn">
                        <b-form-input
                        id="endTimeIn"
                        v-model="form.endTime"
                        placeholder="End Time"
                        type="time"
                        required
                        ></b-form-input>
                    </b-form-group>
                    <b-form-checkbox-group
                        id="weekdays"
                        v-model="form.weekdays"
                        :options="weekdays"
                        name="weekdays"
                        required
                    ></b-form-checkbox-group>
                </b-form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import NavSide from "../../components/NavSide.vue";
import Classes from "../../assets/classes.json";
export default {
    name: "EditClasses",
    components: {
        NavSide
    },
    data() {
        return {
            classes: [],
            classNames: [],
            selectedClass: null,
            form: {
                id: null,
                className: "",
                startTime: null,
                endTime: null,
                weekdays: []
            },
            weekdays: [
                {value: 'M', text: "Monday"},
                {value: 'T', text: "Tuesday"},
                {value: 'W', text: "Wednesday"},
                {value: 'R', text: "Thursday"},
                {value: 'F', text: "Friday"}
            ],
            selectedWeekdays: []
        }
    },
    methods: {
        onChange() {
            var current = this.selectedClass;
            this.form.id = current.id;
            this.form.className = current.name;
            this.form.startTime = current.start_time;
            this.form.endTime = current.end_time;
            this.form.weekdays = [];
            for(var i = 0; i < current.weekdays.length; i++) {
                this.form.weekdays = [...this.form.weekdays, current.weekdays[i]];
            }
        },
        onSubmit() {
            
        }
    },
    mounted:function() {
        this.classes = Classes;
        var i = this.classes.length;
        for (var j = 0; j < i; j++) {
            const classOption = {
                value: this.classes[j],
                text: this.classes[j].name + " (" 
                + this.classes[j].weekdays + ") " 
                + this.classes[j].start_time + " - " 
                + this.classes[j].end_time
            }
            this.classNames = [...this.classNames, classOption];
        }
    }
}
</script>

<style>
#forms {
    width: 60%;
}

#form-edit {
    margin-top: 30px;
}

.times {
width: 45%;
display: inline-block;
}

#endTime {
    margin-left: 5%;
}
</style>
