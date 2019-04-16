<template>
    <div id="classes">
        <TeacherTitle title="Classes" />
        <h4 id="table-instruct">Click on a class to see its roster.</h4>
        <div id="tables">
            <div id="classes">
                <b-table 
                fixed 
                selectable 
                id="table-classes" 
                :items="classes" 
                :fields="fields" 
                :select-mode="selectMode" 
                @row-selected="rowSelect">
                </b-table>
                <b-link to="/teacher/classes/edit_classes">Edit Classes...</b-link>
            </div>
            <div id="roster">
                <b-table fixed id="table-roster" :items="rosterItems" :fields="rosterFields">
                </b-table>
                <b-link v-on:click="editRoster(123)">Edit Roster...</b-link> <!-- replace '123' with class ID -->
            </div>
        </div>
        {{ classTest }}
    </div>
</template>

<script>
import axios from "axios";
import TeacherTitle from "../../components/TeacherTitle.vue";
import Classes from "../../assets/classes.json";
import Roster from "../../assets/roster1.json";
export default {
    name: "classes",
    components: {
        TeacherTitle
    },
    data() {
        return {
            title: "Classes",
            classes: null,
            classTest: null,
            roster: null,
            rosterItems: null,
            fields: ['name', 'weekdays', 'start_time', 'end_time'],
            rosterFields: ['last_name', 'first_name'],
            selectMode: 'single',
            selected: []
        }
    },
    methods: {
        rowSelect(items) {
            var className = items[0].name;
            this.rosterItems = this.roster.filter(roster => roster.className == className);
        },
        editRoster(id) {
            this.$router.push({name: 'edit_roster', params: {classId: id}});
        }
    },
    mounted:function() {
        this.classes = Classes;
        this.roster = Roster;
        axios.get("https://localhost:8081/getClassesTaught?userId=3")
        .then(res => this.classTest = res.data)
        .catch(err => console.log(err));
    }
}
</script>

<style scoped>
#tables {
    display: flex;
    flex-direction: row;
}

#table-classes {
    width: 90%;
}

#table-instruct {
    font-family: "Roboto", "sans serif";
    font-style: italic;
    font-weight: none;
    font-size: 12pt;
}

#table-roster {
    width: 95%;
}
</style>
