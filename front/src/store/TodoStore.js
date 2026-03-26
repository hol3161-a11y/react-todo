import { create } from 'zustand'
import axios from 'axios'

const TodoStore = create((set) => ({
    count: [],
    data: [], // 데이터 보관
    save: async function (value) {
        try {
            let res = await axios.post("http://localhost:4000/todo", value)

            set((item) => {
                return { data: [...item.data, res.data.data] }

            });  // 업데이트 
            console.log(res.data.data);


            if (!res.data.success) {
                throw new Error(res.data.msg);
            }
        }
        catch (err) {
            console.log(`에러발생 : ${err}`);

        }


    },

    get: async function (value) {
        const res = await axios.get(`${process.env.REACT_APP_APIURL}?sort=${value}`);

        if (value === 'all') {
            set({ data: res.data, count: res.data });
        }
        else {
            set({ data: res.data });
        }
    },

    // value = all, false, true
    // sort=${value} 서버에 보내기

    update: async function (id, editText, setEditId) {
        try {
            const res = await axios.put(`${process.env.REACT_APP_APIURL}/state?id=${id}`, { content: editText });
            if (!res.data.success) throw new Error(res.data.msg)
            set(function (item) {
                let upDate = item.data.map(function (obj) {
                    if (obj._id == id) {
                        obj.content = editText;
                    }
                    return obj;

                });
                setEditId('')

                return { data: upDate }
            })

        }
        catch (err) {
            console.log(`에러발생 : ${err}`);
        }
    },

    del: async function (id) {
        try {
            const res = await axios.delete(`${process.env.REACT_APP_APIURL}?id=${id}`);
            if (!res.data.success) throw new Error('에러발생')
            set(function (item) {
                return { data: item.data.filter(obj => obj._id !== id) }
            });
        }
        catch (err) {

        }
    },

    completeTodo: async function(id){
        const res = await axios.put(
            `${process.env.REACT_APP_APIURL}/state?id=${id}`,
            {isdone:true}
        );
        set(function(item){
            let updateData = item.data.map(function(obj){
                                if(obj._id == id){
                                    obj.isdone = true;
                                }
                                return obj;
                            });

            return {data:updateData}
        });
    }
}))

export default TodoStore;