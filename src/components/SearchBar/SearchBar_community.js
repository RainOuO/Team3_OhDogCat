import main_search_left_dog from '../../images/main_search_left_dog.png';
import main_search_right_dog from '../../images/main_search_right_dog.png';
import { AiOutlineSearch } from 'react-icons/ai';
import { Link } from 'react-router-dom';

import './_SearchBar_search.scss';

function SearchBar(props) {
  const {
    searchBar_title,
    searchBar_placeholder,
    keywordSearch,
    setKeywordSearch,
    search,
    setSearch,
    postData,
  } = props;
  console.log('關鍵字', keywordSearch);
  const searchWordParams = keywordSearch ? keywordSearch : '';
  const getPostData = postData ? postData : '';

  const handleSearch = (e) => {
    if (keywordSearch === '') return setSearch('');
    setSearch(keywordSearch);
  };
  return (
    <>
      <section className="searchBar_section_main_bg mb-4">
        <div className="searchBar_main_search">
          <h4 className="searchBar_searchTitle"> {searchBar_title}</h4>
          <div className="searchBar_search">
            <input
              type="text"
              className="searchBar_searchInput"
              placeholder={searchBar_placeholder}
              maxLength={15}
              value={keywordSearch}
              onChange={(e) => {
                console.log('test', e.target.value);
                setKeywordSearch(e.target.value);
              }}
            />
            <Link
              type="btn"
              className="searchBar_searchButton"
              to={`/communitylist?searchword=${searchWordParams}`}
              onClick={handleSearch}
            >
              <i className="searchBar_fa searchBar_fa-search">
                <AiOutlineSearch />
              </i>
            </Link>
          </div>
          <img
            className="searchBar_main_search_left_dog"
            src={main_search_left_dog}
            alt="left_dog"
          />
          <img
            className="searchBar_main_search_right_dog"
            src={main_search_right_dog}
            alt="right_dog"
          />
        </div>
      </section>
    </>
  );
}

export default SearchBar;
