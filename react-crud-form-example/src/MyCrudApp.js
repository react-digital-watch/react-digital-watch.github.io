import React from 'react';
// import ReactDOM from 'react-dom';
import CRUDForm from 'react-crud-form';

class MyCrudApp extends React.Component {

    constructor(props) {
        super(props);
        // Data source
        this.state = {
            data: props.data,
            nextId: 100,
        };
        this.delete = this.delete.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.findDatumIdx = this.findDatumIdx.bind(this);
    }


    // Callbacks for performing CRUD operations.
    // These are required props for CRUDForm.
    // Be careful to note that the `id` parameters are objects,
    // where the keys are names of model attributes. So `id` will look like
    // { "id": 1 } or { "itemId": 1, "modifierClassId": 2 }.
    // (string, Object) => Promise

    delete(model, id) {
        return new Promise((resolve, reject) => {
            let data = this.state.data;
            let idx = this.findDatumIdx(model, id);
            if (idx === -1) {
                resolve();
            } else {
                data[model].splice(idx, 1);
                this.setState({ data }, () => resolve());
            }
        });
    }


    // (string, Object) => Promise

    create(model, record) {

        return new Promise((resolve, reject) => {
            let { data, nextId } = this.state;
            let newRecord = {
                ...record,
            };

            if (model !== 'itemModifierClass') {
                newRecord.id = nextId;
                nextId++;
            }

            data[model].push(newRecord);
            this.setState({ data, nextId }, () => resolve());

        });

    }

    // (string, Object, Object) => Promise

    update(model, updates, id) {
        return new Promise((resolve, reject) => {
            // Example of a validation error. Try updating an item record!

            if (model === 'item') {
                return reject({ name: 'Name is too long' });
            }

            let data = this.state.data;
            const idx = this.findDatumIdx(model, id);

            if (idx === -1) {
                resolve();
            } else {
                const newRecord = {
                    ...data[model][idx],
                    ...updates,
                };

                data[model][idx] = newRecord;
                this.setState({ data }, () => resolve());
            }
        });
    }

    findDatumIdx(model, id) {
        let data = this.state.data;
        if (model === 'itemModifierClass') {
            return data[model].findIndex(({ itemId, menuId }) =>
            itemId === id.itemId && menuId === id.menuId);
        } else {
            return data[model].findIndex((x) => x.id === id.id);
        }
    }

    render() {
        return (
            // CRUDForm needs the following 5 props, all of which are required:
            // * data - An object with keys that are `names` (from the schemata)
            //   and values that are arrays of records. See `allData` below for an
            //   example.
            // * schemata - Schemata for the data.
            // * create, update, delete - Callbacks for CRUD actions.

            <CRUDForm
                data={this.state.data}
                schemata={this.props.schemata}
                delete={this.delete}
                create={this.create}
                update={this.update}
            />);
    }
}

export default MyCrudApp