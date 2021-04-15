interface IResult {
    success: boolean;
    error?: any;
}

let result: IResult = { success: true };

const wait = (ms: number) =>
    new Promise((res, rej) => {
        if (ms > 1000) {
            setTimeout(() => {
                rej('Too long');
            }, ms);
        } else {
            setTimeout(() => {
                res('Sucessfully waited');
            }, ms);
        }
    });

export const fn = async () => {
    // setTimeout(() => {
    //     try {
    //         throw new Error('Some thing wrong');
    //     } catch (error) {
    //         result.success = false;
    //         result.error = error;
    //     }
    // }, 1000);
    // console.log(result);

    try {
        const res = await wait(1200);
        console.log(res);
    } catch (e) {
        console.log(e);
    }

    // fetch('https://jsonplaceholder.typicode.com/posts')
    //     .then((resp) => resp.json())
    //     .then((data) => console.log(data))
    //     .catch((error) => console.error('promise error', error));
};

fn();
