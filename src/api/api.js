import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3001';

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * 
 * API template modeled from Springboards' Jobly exercise solution, 03/17/22.
 * 
 */

class IvyTutorsApi {
  // the token for interacting with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = 'get') {
    // console.debug('API Call:', endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${IvyTutorsApi.token}` };
    const params = (method === 'get')
      ? data
      : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error('API Error:', err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get the current user. */

  static async getCurrentUser(email) {
    let res = await this.request(`users/${email}`);
    return res.user;
  }

  /** Get Lessons */

  static async getLessons() {
    let res = await this.request('lessons');
    return res.lessons;
  }

  /** Get Available tutors at time */

  static async getAvailableTutors(time) {
    let res = await this.request(`availability/all/${time}`);
    return res.availabilities;
  }


  /** Get a tutor's weekly availability */

  static async getTutorAvailability(tutor) {
    let res = await this.request(`availability/${tutor}`);
    return res.availabilities;
  }


  /** Add Lessons */

  static async bookLesson(tutor, student, time) {
    let res = await this.request('lessons', {tutor, student, time}, 'post');
    return res.lesson;
  }

  /** Get details on a company by handle. */

  // static async getCompany(handle) {
  //   let res = await this.request(`companies/${handle}`);
  //   return res.company;
  // }

  /** Get list of jobs (filtered by title if not undefined) */

  // static async getJobs(title) {
  //   let res = await this.request('jobs', { title });
  //   return res.jobs;
  // }

  /** Apply to a job */

  // static async applyToJob(username, id) {
  //   await this.request(`users/${username}/jobs/${id}`, {}, 'post');
  // }

  /** Get token for login from username, password. */

  static async login(data) {
    let res = await this.request('auth/token', data, 'post');
    return res.token;
  }

  /** Signup for site. */

  static async signup(data) {
    let res = await this.request('auth/register', data, 'post');
    return res.token;
  }

  /** Save user profile page. */

  // static async saveProfile(username, data) {
  //   let res = await this.request(`users/${username}`, data, 'patch');
  //   return res.user;
  // }
}


export default IvyTutorsApi;
