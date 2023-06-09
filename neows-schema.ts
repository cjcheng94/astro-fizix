/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  "/rest/v1/stats": {
    /** Get the Near Earth Object data set totals */
    get: operations["retrieveCurrentNeoStatistics"];
  };
  "/rest/v1/neo/{asteroid_id}": {
    /**
     * Find Near Earth Objects by id
     * @description Retrieve a Near Earth Object by the SPKID or Asteroid Name
     */
    get: operations["retrieveNearEarthObjectById"];
  };
  "/rest/v1/neo/sentry": {
    /**
     * Retrieve Sentry (Impact Risk ) Near Earth Objects
     * @description Retrieves Near Earth Objects listed in the NASA sentry data set
     */
    get: operations["retrieveSentryRiskData"];
  };
  "/rest/v1/neo/sentry/{asteroid_id}": {
    /**
     * Retrieve Sentry (Impact Risk ) Near Earth Objectby ID
     * @description Retrieves Sentry Near Earth Object by ID
     */
    get: operations["retrieveSentryRiskDataById"];
  };
  "/rest/v1/neo/browse": {
    /**
     * Browse the Near Earth Objects service
     * @description Retieve a paginated list of Near Earth Objects
     */
    get: operations["browseNearEarthObjects"];
  };
  "/rest/v1/feed": {
    /**
     * Find Near Earth Objects by date
     * @description Get a list of Near Earth Objects within a date range, The max range in one query is 7 days
     */
    get: operations["retrieveNearEarthObjectFeed"];
  };
  "/rest/v1/feed/today": {
    /**
     * Find Near Earth Objects for today
     * @description Get a list of Near Earth Objects for today
     */
    get: operations["retrieveNEOFeedToday"];
  };
}

export type webhooks = Record<string, never>;

export interface components {
  schemas: {
    Statistics: {
      /**
       * Number of NearEarthObjects listed in NeoWs
       * Format: int64
       */
      near_earth_object_count?: number;
      /**
       * Number of Close Approach listings across all NEOs listed in NeoWs
       * Format: int64
       */
      close_approach_count?: number;
      /** TimeStamp the last time the DB was updated */
      last_updated?: string;
      source?: string;
      /** Format: url */
      nasa_jpl_url?: string;
    };
    /** Close approach information of the Asteroid */
    CloseApproachData: {
      close_approach_date?: string;
      close_approach_date_full?: string;
      /** Format: int64 */
      epoch_date_close_approach?: number;
      relative_velocity?: components["schemas"]["RelVelocity"];
      miss_distance?: components["schemas"]["MissDistance"];
      orbiting_body?: string;
    };
    /** EstimatedDiameter */
    EstimatedDiameter: {
      /**
       * An estimate of the minimum size of the Asteroid - bases on the abosolute magnitude
       * Format: double
       */
      estimated_diameter_min?: number;
      /**
       * An estimate of the maximum size of the Asteroid - bases on the abosolute magnitude
       * Format: double
       */
      estimated_diameter_max?: number;
    };
    /** A collection of estimated diameters (kilometers, meters, miles, feet */
    EstimatedDiameterContainer: {
      kilometers?: components["schemas"]["EstimatedDiameter"];
      meters?: components["schemas"]["EstimatedDiameter"];
      miles?: components["schemas"]["EstimatedDiameter"];
      feet?: components["schemas"]["EstimatedDiameter"];
    };
    MissDistance: {
      astronomical?: string;
      lunar?: string;
      kilometers?: string;
      miles?: string;
    };
    /** NearEarthObject */
    NearEarthObject: {
      selfLink?: string;
      links?: {
        [key: string]: string | undefined;
      };
      id?: string;
      /** The reference ID of the Asteroid - This correlates to the SPK ID for the JPL NEO data */
      neo_reference_id?: string;
      name?: string;
      name_limited?: string;
      designation?: string;
      /** A Link to the NASA JPL Small-Body Database website */
      nasa_jpl_url?: string;
      /**
       * Is a measure of an asteroids brightness
       * Format: double
       */
      absolute_magnitude_h?: number;
      estimated_diameter?: components["schemas"]["EstimatedDiameterContainer"];
      is_potentially_hazardous_asteroid?: boolean;
      /** Close approach information of the Asteroid */
      close_approach_data?: components["schemas"]["CloseApproachData"][];
      orbital_data?: components["schemas"]["OrbitalData"];
      is_sentry_object?: boolean;
      sentry_data?: string;
    };
    OrbitClass: {
      /** @enum {string} */
      orbit_class_type?:
        | "IEO"
        | "ATE"
        | "APO"
        | "AMO"
        | "MCA"
        | "IMB"
        | "MBA"
        | "OMB"
        | "TJN"
        | "CEN"
        | "TNO"
        | "PAA"
        | "HYA"
        | "HYP"
        | "PAR"
        | "COM"
        | "JFC"
        | "HTC"
        | "ETC"
        | "CTC"
        | "JFc";
      orbit_class_description?: string;
      orbit_class_range?: string;
    };
    /** Orbital information of t1he asteroid */
    OrbitalData: {
      orbit_id?: string;
      orbit_determination_date?: string;
      first_observation_date?: string;
      last_observation_date?: string;
      /** Format: int64 */
      data_arc_in_days?: number;
      /** Format: int64 */
      observations_used?: number;
      orbit_uncertainty?: string;
      minimum_orbit_intersection?: string;
      jupiter_tisserand_invariant?: string;
      epoch_osculation?: string;
      eccentricity?: string;
      semi_major_axis?: string;
      inclination?: string;
      ascending_node_longitude?: string;
      orbital_period?: string;
      perihelion_distance?: string;
      perihelion_argument?: string;
      aphelion_distance?: string;
      perihelion_time?: string;
      mean_anomaly?: string;
      mean_motion?: string;
      equinox?: string;
      orbit_class?: components["schemas"]["OrbitClass"];
    };
    RelVelocity: {
      kilometers_per_second?: string;
      kilometers_per_hour?: string;
      miles_per_hour?: string;
    };
    PageMetaData: {
      /** Format: int64 */
      size?: number;
      /** Format: int64 */
      total_elements?: number;
      /** Format: int64 */
      total_pages?: number;
      /** Format: int64 */
      number?: number;
    };
    PageSentryImpactRiskObject: {
      /** Format: int32 */
      totalPages?: number;
      /** Format: int64 */
      totalElements?: number;
      /** Format: int32 */
      size?: number;
      content?: components["schemas"]["SentryImpactRiskObject"][];
      /** Format: int32 */
      number?: number;
      sort?: components["schemas"]["SortObject"];
      pageable?: components["schemas"]["PageableObject"];
      /** Format: int32 */
      numberOfElements?: number;
      first?: boolean;
      last?: boolean;
      empty?: boolean;
    };
    PageableObject: {
      /** Format: int64 */
      offset?: number;
      sort?: components["schemas"]["SortObject"];
      unpaged?: boolean;
      paged?: boolean;
      /** Format: int32 */
      pageNumber?: number;
      /** Format: int32 */
      pageSize?: number;
    };
    SentryImpactRiskObject: {
      links?: {
        [key: string]: string | undefined;
      };
      spkId?: string;
      designation?: string;
      sentryId?: string;
      fullname?: string;
      year_range_min?: string;
      year_range_max?: string;
      potential_impacts?: string;
      impact_probability?: string;
      v_infinity?: string;
      absolute_magnitude?: string;
      estimated_diameter?: string;
      palermo_scale_ave?: string;
      Palermo_scale_max?: string;
      torino_scale?: string;
      last_obs?: string;
      last_obs_jd?: string;
      url_nasa_details?: string;
      url_orbital_elements?: string;
      is_active_sentry_object?: boolean;
      removal_date?: string;
      url_impact_details?: string;
      url_orbital_element_details?: string;
      /** Format: double */
      average_lunar_distance?: number;
    };
    SentryObjectPagingDto: {
      upPage?: components["schemas"]["PageSentryImpactRiskObject"];
      links?: {
        [key: string]: string | undefined;
      };
      page?: components["schemas"]["PageMetaData"];
      sentry_objects?: components["schemas"]["SentryImpactRiskObject"][];
    };
    SortObject: {
      empty?: boolean;
      sorted?: boolean;
      unsorted?: boolean;
    };
    Link: {
      rel?: string;
      href?: string;
      hreflang?: string;
      media?: string;
      title?: string;
      type?: string;
      deprecation?: string;
      profile?: string;
      name?: string;
    };
    NearEarthObjectRestPagingDto: {
      upPage?: components["schemas"]["PageNearEarthObject"];
      upLinks?: components["schemas"]["Link"][];
      links?: {
        [key: string]: string | undefined;
      };
      page?: components["schemas"]["PageMetaData"];
      near_earth_objects?: components["schemas"]["NearEarthObject"][];
    };
    PageNearEarthObject: {
      /** Format: int32 */
      totalPages?: number;
      /** Format: int64 */
      totalElements?: number;
      /** Format: int32 */
      size?: number;
      content?: components["schemas"]["NearEarthObject"][];
      /** Format: int32 */
      number?: number;
      sort?: components["schemas"]["SortObject"];
      pageable?: components["schemas"]["PageableObject"];
      /** Format: int32 */
      numberOfElements?: number;
      first?: boolean;
      last?: boolean;
      empty?: boolean;
    };
    /** NearEarthObjectList */
    NearEarthObjectRestDto: {
      /** Hypermedia links to collection */
      links?: {
        [key: string]: string | undefined;
      };
      /**
       * Number of NEOs in list
       * Format: int32
       */
      element_count?: number;
      /** A collection of NearEarthObjects */
      near_earth_objects?: {
        [key: string]: components["schemas"]["NearEarthObject"][] | undefined;
      };
    };
  };
  responses: never;
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}

export type external = Record<string, never>;

export interface operations {
  /** Get the Near Earth Object data set totals */
  retrieveCurrentNeoStatistics: {
    responses: {
      /** @description OK */
      200: {
        content: {
          "application/json": components["schemas"]["Statistics"];
        };
      };
    };
  };
  /**
   * Find Near Earth Objects by id
   * @description Retrieve a Near Earth Object by the SPKID or Asteroid Name
   */
  retrieveNearEarthObjectById: {
    parameters: {
      path: {
        /** @description ID of Near Earth Object - (ex: 3729835) */
        asteroid_id: string;
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "application/json": components["schemas"]["NearEarthObject"];
        };
      };
    };
  };
  /**
   * Retrieve Sentry (Impact Risk ) Near Earth Objects
   * @description Retrieves Near Earth Objects listed in the NASA sentry data set
   */
  retrieveSentryRiskData: {
    parameters: {
      query: {
        /** @description show current list of Sentry objects, or show removed Sentry objects */
        is_active?: boolean;
        page?: number;
        size?: number;
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "application/json": components["schemas"]["SentryObjectPagingDto"];
        };
      };
    };
  };
  /**
   * Retrieve Sentry (Impact Risk ) Near Earth Objectby ID
   * @description Retrieves Sentry Near Earth Object by ID
   */
  retrieveSentryRiskDataById: {
    parameters: {
      path: {
        /** @description ID of NearEarth object.  ID can be SPK_ID, Asteroid des (designation) or Sentry ID */
        asteroid_id: string;
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "application/json": components["schemas"]["SentryImpactRiskObject"];
        };
      };
    };
  };
  /**
   * Browse the Near Earth Objects service
   * @description Retieve a paginated list of Near Earth Objects
   */
  browseNearEarthObjects: {
    parameters: {
      query: {
        page?: number;
        size?: number;
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "application/json": components["schemas"]["NearEarthObjectRestPagingDto"];
        };
      };
    };
  };
  /**
   * Find Near Earth Objects by date
   * @description Get a list of Near Earth Objects within a date range, The max range in one query is 7 days
   */
  retrieveNearEarthObjectFeed: {
    parameters: {
      query: {
        /** @description Start of date range search, format: yyyy-MM-dd - (ex: 2015-04-28) */
        start_date?: string;
        /** @description End of date range search, format: yyyy-MM-dd - (ex: 2015-04-28). If left off search will extends 7 days from start_date */
        end_date?: string;
        detailed?: boolean;
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "application/json": components["schemas"]["NearEarthObjectRestDto"];
        };
      };
    };
  };
  /**
   * Find Near Earth Objects for today
   * @description Get a list of Near Earth Objects for today
   */
  retrieveNEOFeedToday: {
    parameters: {
      query: {
        detailed?: boolean;
      };
    };
    responses: {
      /** @description OK */
      200: {
        content: {
          "application/json": components["schemas"]["NearEarthObjectRestDto"];
        };
      };
    };
  };
}
