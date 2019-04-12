<template>
    <div id="classes">
        <NavSide/>
        <div class="teacher-wrapper">
            <h1 class="teacher-title">Classes</h1>
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
                    <b-link to="/teacher/edit_classes">Edit Classes...</b-link>
                </div>
                <div id="roster">
                    <b-table fixed id="table-roster" :items="rosterItems" :fields="rosterFields">
                    </b-table>
                    <b-link>Edit Roster...</b-link>
                </div>
            </div>
            {{ classTest }}
        </div>
    </div>
</template>

<script>
import axios from "axios";
import NavSide from "../../components/NavSide.vue";
import Classes from "../../assets/classes.json";
import Roster from "../../assets/roster1.json";
export default {
    name: "classes",
    components: {
        NavSide
    },
    data() {
        return {
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

<style>
#titles {
    display: flex;
    flex-direction: row;
}
#tables {
    display: flex;
    flex-direction: row;
}

#classes {
    width: 90%;
}

#table-classes {
    width: 95%;
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
