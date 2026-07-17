// =====================================================
// [12.6.4]
// API CLIENT
// =====================================================

// =====================================================
// [12.6.5]
// Sends POST request.
// =====================================================

export async function post(

    url,
    data

) {

    const response =

        await fetch(

            url,

            {
                method:
                    "POST",

                headers:
                    {
                        "Content-Type":
                            "application/json"
                    },

                body:
                    JSON.stringify(
                        data
                    )
            }
        );

    return response;
}