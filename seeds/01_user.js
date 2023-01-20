exports.seed = knex => {
    // Deletes ALL existing entries
    return knex("users")
        .del()
        .then(() => {
            // Inserts seed entries
            return knex("users").insert([{
                id: 1,
                firstName: "Ondrea",
                lastName: "Micheu",
                emailId: "omicheu0@mayoclinic",
                phoneNo: "+81 787 360 0119",
                employeeCode: "2110271507",
                region: "JP",
                jobRole: "Human Resources Assistant II",
                company: "Zazio",
                created_at: new Date(),
                updated_at: new Date()
            }, {
                id: 2,
                firstName: "Thaddeus",
                lastName: "Fearnsides",
                emailId: "tfearnsides1@plala.or.jp",
                phoneNo: "+62 240 552 5602",
                employeeCode: "0554512815",
                region: "ID",
                jobRole: "Operator",
                company: "Flipopia",
                created_at: new Date(),
                updated_at: new Date()
            }]);
        });
};