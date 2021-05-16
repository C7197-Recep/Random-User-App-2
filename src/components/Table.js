import React, {useState, useEffect, useMemo, useCallback} from 'react';

/*APP.JS DEN GELEN userList DEGISKENINI BURADA MAP ILE KULLANARAK TABLOYA EKLER*/
function Table(userList){
    return(
        <div className="users-table">
        <table>
          <colgroup>
            <col span="1" style={{ width: '25%' }}></col>
            <col span="1" style={{ width: '25%' }}></col>
            <col span="1" style={{ width: '25%' }}></col>
            <col span="1" style={{ width: '25%' }}></col>
          </colgroup>
          <tbody>
            <tr className="table-header">
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Age</th>
            </tr>
            {userList.userList.map((item, i) => (
            <tr key={i}>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.phone}</td>
              <td>{item.age}</td>
            </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
}

export default Table;

