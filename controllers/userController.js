const http = require('http');

const emailRegex = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,9}|[0-9]{1,3})(\]?)$/;
const contactRegex = /^\+(?:[0-9] ?){6,14}[0-9]$/;

/**fetch all users from the server and add validation on phoneNumber and emailId */
function getAllUsers(req, res, next) {

    try {

        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const request = http.request(process.env.URL, options, response => {

            let string = '';

            response.on('data', d => {
                string += d;
            }).on('end', async () => {
                const users = JSON.parse(string) || [];

                let invalid = false;

                users.forEach(user => {
                    user.invalidFields = [];
                    if (!user.emailId || !emailRegex.test(user.emailId)) {
                        user.invalid = true;
                        user.invalidFields.push('emailId');
                    }
                    if (!user.phoneNo || !contactRegex.test(user.phoneNo)) {
                        user.invalid = true;
                        user.invalidFields.push('phoneNo');
                    }

                    if (user.invalid) invalid = true;
                });

                return res.json({
                    success: true,
                    result: users.length,
                    data: {
                        users,
                        invalid
                    }
                })

            })

        })

        request.on('error', err => {
            console.log(err);

            return res.status(500).json({
                success: false,
                message: err.message || err
            })
        })

        request.end();

    } catch (error) {

        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message || error
        })

    }
}

module.exports = { getAllUsers };