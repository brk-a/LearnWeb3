import { AiFillLock, AiFillUnlock } from 'react-icons/ai'
import { RiSendPlaneFill, RiCloseFill } from 'react-icons/ri'

import Style from '../src/app/index.module.css'

const Data = ({allToDoLists, allAddresses, myLists, changeToggle}) => {
  return (
    <div className={Style.home_create_list}>
      {
        allToDoLists.length ? (
          <div className={Style.no_data}>
            All done
          </div>
        ) : (
          <div>
          {allToDoLists.map((li, i) => (
            <div key={i+1}
              className={Style.home_create_list_app}
            >
              <div className={Style.lock_list}>
                <AiFillLock className={Style.lock_colour}/>
                <p>{li[2]}</p>
              </div>
              {
                li[3]===false ? (
                  <RiCloseFill
                    onClick={() => changeToggle(li[0])}
                    className={Style.iconClose}
                  />
                ) : (
                  <p className={Style.done}>Done</p>
                )
            }
            </div>
          ))}
          </div>
        )
      }
    </div>
  )
}

export default Data